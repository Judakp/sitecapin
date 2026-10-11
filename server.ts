import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import compression from "compression";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(compression({ threshold: 1024 }));
app.use(express.json({ limit: "1mb" }));

/**
 * ============================================================
 * CONFIGURATION GEMINI
 * ============================================================
 */

const GEMINI_MODEL = "gemini-3.6-flash";

/**
 * Initialise le client Gemini uniquement lorsque la clé API existe.
 * La clé reste côté serveur et n'est jamais envoyée au frontend.
 */
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  return new GoogleGenAI({
    apiKey,
  });
}

/**
 * ============================================================
 * HEALTH CHECK
 * ============================================================
 *
 * Permet de vérifier rapidement :
 * http://localhost:3000/api/health
 *
 * Exemple de réponse :
 * {
 *   "status": "ok",
 *   "geminiConfigured": true,
 *   "model": "gemini-3.6-flash"
 * }
 */
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY?.trim()),
    model: GEMINI_MODEL,
    timestamp: new Date().toISOString(),
  });
});

/**
 * ============================================================
 * TYPES
 * ============================================================
 */

type PlaygroundTab =
  | "automation"
  | "web_architect"
  | "studio_app";

type PlaygroundLanguage = "fr" | "en";

/**
 * Vérifie que l'onglet envoyé par le frontend est valide.
 */
function isValidTab(value: unknown): value is PlaygroundTab {
  return (
    value === "automation" ||
    value === "web_architect" ||
    value === "studio_app"
  );
}

/**
 * Vérifie que la langue envoyée par le frontend est valide.
 */
function normalizeLanguage(value: unknown): PlaygroundLanguage {
  return value === "en" ? "en" : "fr";
}

/**
 * Nettoyage très léger des valeurs reçues.
 * On évite surtout les valeurs null/undefined et les contenus énormes.
 */
function cleanValue(value: unknown, fallback = ""): string {
  if (typeof value !== "string") {
    return fallback;
  }

  return value.trim().slice(0, 5000);
}

/**
 * ============================================================
 * PROMPTS
 * ============================================================
 */

/**
 * Prompt spécialisé AUTOMATISATION
 */
function buildAutomationPrompt(
  parameters: Record<string, unknown>,
  language: PlaygroundLanguage
) {
  const outputLanguage = language === "fr" ? "Français" : "English";

  const industry = cleanValue(parameters.autoIndustry, "Non précisé");
  const description = cleanValue(
    parameters.autoDescription,
    "Non précisée"
  );
  const teamSize = cleanValue(
    parameters.autoTeamSize,
    "Non précisée"
  );
  const bottleneck = cleanValue(
    parameters.autoBottleneck,
    "Non précisé"
  );
  const volume = cleanValue(
    parameters.autoVolume,
    "Non précisé"
  );

  return `
Tu es un consultant senior spécialisé en intelligence artificielle,
automatisation des processus et transformation opérationnelle des PME.

Tu dois analyser une entreprise RÉELLE à partir des informations fournies
ci-dessous.

LANGUE DE SORTIE :
${outputLanguage}

IMPORTANT :
- L'analyse doit être personnalisée aux données fournies.
- Ne donne pas une réponse générique pouvant convenir à n'importe quelle entreprise.
- Ne répète pas simplement les informations saisies.
- Identifie les tâches réellement automatisables.
- Propose assistants IA cohérents avec le métier.
- Les économies de temps sont des ESTIMATIONS : ne les présente jamais comme des mesures réelles.
- N'invente pas de logiciels qui n'ont pas été mentionnés.
- Si une information manque, formule une hypothèse prudente plutôt que d'inventer un fait.
- Les recommandations doivent être compréhensibles par un entrepreneur non technicien.
- Réponds STRICTEMENT selon le schéma JSON fourni.

DONNÉES DE L'ENTREPRISE :

Secteur / métier :
${industry}

Description :
${description}

Taille de l'équipe :
${teamSize}

Tâche répétitive / principal point de friction :
${bottleneck}

Volume mensuel :
${volume}

TRAVAIL DEMANDÉ :

1. Évalue le potentiel d'automatisation de 0 à 10.
2. Explique précisément pourquoi.
3. Identifie 3 sources de gains de temps adaptées à cette entreprise.
4. Propose 3 assistants IA spécifiques à ce contexte.
5. Donne une "quick win" réaliste pouvant constituer la première automatisation à mettre en place.
`;
}

/**
 * Prompt spécialisé ARCHITECTE WEB
 */
function buildWebArchitectPrompt(
  parameters: Record<string, unknown>,
  language: PlaygroundLanguage
) {
  const outputLanguage = language === "fr" ? "Français" : "English";

  const activity = cleanValue(
    parameters.webActivity,
    "Non précisée"
  );
  const description = cleanValue(
    parameters.webDescription,
    "Non précisée"
  );
  const goal = cleanValue(
    parameters.webGoal,
    "Non précisé"
  );
  const style = cleanValue(
    parameters.webStyle,
    "Non précisé"
  );
  const conversion = cleanValue(
    parameters.webConversion,
    "Non précisé"
  );

  return `
Tu es un architecte web senior, UX strategist et spécialiste de la
conversion.

Tu dois concevoir l'architecture stratégique d'un site web en fonction
du contexte métier fourni.

LANGUE DE SORTIE :
${outputLanguage}

IMPORTANT :
- L'architecture doit être spécifique à l'activité.
- Ne produis pas un modèle de site générique.
- Les pages proposées doivent servir l'objectif commercial indiqué.
- Les sections doivent répondre aux besoins du public cible.
- Les agents IA proposés doivent être réellement pertinents pour ce site.
- Prends en compte le style visuel et le mécanisme de conversion.
- Ne promets pas de résultats commerciaux garantis.
- Réponds STRICTEMENT selon le schéma JSON fourni.

DONNÉES DU PROJET :

Activité / cible :
${activity}

Description détaillée :
${description}

Objectif principal :
${goal}

Style et expérience souhaitée :
${style}

Mécanisme de conversion :
${conversion}

TRAVAIL DEMANDÉ :

1. Trouve une proposition de valeur claire.
2. Définis une direction UX/UI cohérente avec le secteur.
3. Propose 4 à 5 pages clés.
4. Pour chaque page, précise son objectif, ses sections importantes
   et son appel à l'action.
5. Propose 2 à 4 agents IA pertinents pour ce site.
6. Termine par un court message de synthèse orienté conversion.
`;
}

/**
 * Prompt spécialisé STUDIO APP
 */
function buildStudioAppPrompt(
  parameters: Record<string, unknown>,
  language: PlaygroundLanguage
) {
  const outputLanguage = language === "fr" ? "Français" : "English";

  const appType = cleanValue(
    parameters.appType,
    "Non précisé"
  );
  const description = cleanValue(
    parameters.appDescription,
    "Non précisée"
  );
  const feature = cleanValue(
    parameters.appFeature,
    "Non précisée"
  );
  const platform = cleanValue(
    parameters.appPlatform,
    "Non précisée"
  );

  return `
Tu es un Product Manager senior spécialisé dans les applications mobiles,
l'expérience utilisateur et l'intégration de fonctionnalités d'intelligence
artificielle.

Tu dois concevoir un blueprint d'application directement adapté au cas
d'utilisation fourni.

LANGUE DE SORTIE :
${outputLanguage}

IMPORTANT :
- Les fonctionnalités doivent découler du problème présenté.
- Ne propose pas la même application générique pour tous les secteurs.
- Fais la distinction entre fonctionnalités indispensables et bonus.
- Le parcours utilisateur doit être logique.
- Les agents IA doivent avoir une utilité précise dans l'application.
- Les recommandations doivent être compréhensibles par un porteur de projet.
- Ne transforme pas automatiquement toute fonctionnalité en IA :
  utilise l'IA seulement lorsqu'elle apporte une vraie valeur.
- Réponds STRICTEMENT selon le schéma JSON fourni.

DONNÉES DU PROJET :

Type d'application :
${appType}

Description du problème / activité :
${description}

Fonctionnalité IA prioritaire :
${feature}

Plateforme cible :
${platform}

TRAVAIL DEMANDÉ :

1. Propose 3 à 5 fonctionnalités indispensables.
2. Propose 2 à 4 fonctionnalités bonus réellement différenciantes.
3. Décris un parcours utilisateur en 4 étapes.
4. Propose 2 à 3 agents IA intégrés directement dans l'application.
5. Donne une recommandation finale sur l'architecture UX.
`;
}

/**
 * ============================================================
 * JSON SCHEMAS
 * ============================================================
 */

const playgroundResponseSchema = {
  type: Type.OBJECT,

  properties: {
    title: {
      type: Type.STRING,
    },

    summary: {
      type: Type.STRING,
    },

    metrics: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: {
            type: Type.STRING,
          },

          value: {
            type: Type.STRING,
          },

          sub: {
            type: Type.STRING,
          },

          color: {
            type: Type.STRING,
          },
        },

        required: [
          "label",
          "value",
          "sub",
          "color",
        ],
      },
    },

    diagnostics: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          problem: {
            type: Type.STRING,
          },

          impact: {
            type: Type.STRING,
          },

          severity: {
            type: Type.STRING,
          },
        },

        required: [
          "problem",
          "impact",
          "severity",
        ],
      },
    },

    architecture: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          agentName: {
            type: Type.STRING,
          },

          role: {
            type: Type.STRING,
          },

          tech: {
            type: Type.STRING,
          },

          description: {
            type: Type.STRING,
          },
        },

        required: [
          "agentName",
          "role",
          "tech",
          "description",
        ],
      },
    },

    gains: {
      type: Type.OBJECT,

      properties: {
        timeSaved: {
          type: Type.STRING,
        },

        paybackDays: {
          type: Type.STRING,
        },

        revenueBoost: {
          type: Type.STRING,
        },

        score: {
          type: Type.NUMBER,
        },
      },

      required: [
        "timeSaved",
        "paybackDays",
        "revenueBoost",
        "score",
      ],
    },

    phases: {
      type: Type.ARRAY,

      items: {
        type: Type.OBJECT,

        properties: {
          step: {
            type: Type.STRING,
          },

          title: {
            type: Type.STRING,
          },

          timeline: {
            type: Type.STRING,
          },

          deliverable: {
            type: Type.STRING,
          },
        },

        required: [
          "step",
          "title",
          "timeline",
          "deliverable",
        ],
      },
    },

    rawBlueprint: {
      type: Type.STRING,
    },
  },

  required: [
    "title",
    "summary",
    "metrics",
    "diagnostics",
    "architecture",
    "gains",
    "phases",
    "rawBlueprint",
  ],
};

/**
 * ============================================================
 * ANCIENNE ROUTE GEMINI
 * ============================================================
 */
app.post("/api/gemini/generate", async (req, res) => {
  const {
    moduleType,
    payload,
    language: requestedLanguage,
  } = req.body;

  const language = normalizeLanguage(requestedLanguage);

  if (!moduleType || !payload) {
    return res.status(400).json({
      success: false,
      error: "moduleType and payload are required",
    });
  }

  const ai = getGeminiClient();

  if (!ai) {
    return res.status(503).json({
      success: false,
      mode: "gemini_unavailable",
      error:
        "La clé GEMINI_API_KEY n'est pas configurée sur le serveur.",
    });
  }

  try {
    let systemInstruction = "";
    let prompt = "";
    let responseSchema: any = null;

    if (moduleType === "automation") {
      systemInstruction = `
Tu es un consultant senior en automatisation et intelligence artificielle.

Tu analyses une entreprise à partir de ses informations opérationnelles.

Sois concret, prudent et personnalisé.

Réponds exclusivement avec le JSON demandé.
`;

      prompt = buildAutomationPrompt(
        payload,
        language
      );

      responseSchema = {
        type: Type.OBJECT,

        properties: {
          score: {
            type: Type.NUMBER,
          },

          scoreRationale: {
            type: Type.STRING,
          },

          timeSavings: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                title: {
                  type: Type.STRING,
                },

                hoursSavedPerWeek: {
                  type: Type.STRING,
                },

                explanation: {
                  type: Type.STRING,
                },

                priority: {
                  type: Type.STRING,
                },
              },

              required: [
                "title",
                "hoursSavedPerWeek",
                "explanation",
                "priority",
              ],
            },
          },

          virtualAssistants: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                name: {
                  type: Type.STRING,
                },

                role: {
                  type: Type.STRING,
                },

                concreteMission: {
                  type: Type.STRING,
                },

                toolIntegrations: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING,
                  },
                },

                trigger: {
                  type: Type.STRING,
                },
              },

              required: [
                "name",
                "role",
                "concreteMission",
                "toolIntegrations",
                "trigger",
              ],
            },
          },

          quickWin: {
            type: Type.STRING,
          },
        },

        required: [
          "score",
          "scoreRationale",
          "timeSavings",
          "virtualAssistants",
          "quickWin",
        ],
      };

    } else if (moduleType === "web_architect") {
      systemInstruction = `
Tu es un architecte web senior spécialisé en UX, conversion,
positionnement digital et intégration de fonctionnalités IA.

Réponds exclusivement avec le JSON demandé.
`;

      prompt = buildWebArchitectPrompt(
        payload,
        language
      );

      responseSchema = {
        type: Type.OBJECT,

        properties: {
          catchphrase: {
            type: Type.STRING,
          },

          toneSummary: {
            type: Type.STRING,
          },

          pages: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                name: {
                  type: Type.STRING,
                },

                purpose: {
                  type: Type.STRING,
                },

                keySections: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING,
                  },
                },

                callToAction: {
                  type: Type.STRING,
                },
              },

              required: [
                "name",
                "purpose",
                "keySections",
                "callToAction",
              ],
            },
          },

          aiAgents: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                name: {
                  type: Type.STRING,
                },

                placement: {
                  type: Type.STRING,
                },

                userBenefit: {
                  type: Type.STRING,
                },
              },

              required: [
                "name",
                "placement",
                "userBenefit",
              ],
            },
          },

          teaserMessage: {
            type: Type.STRING,
          },
        },

        required: [
          "catchphrase",
          "toneSummary",
          "pages",
          "aiAgents",
          "teaserMessage",
        ],
      };

    } else if (moduleType === "studio_app") {
      systemInstruction = `
Tu es un Product Manager senior spécialisé dans les applications
mobiles, UX et intelligence artificielle.

Réponds exclusivement avec le JSON demandé.
`;

      prompt = buildStudioAppPrompt(
        payload,
        language
      );

      responseSchema = {
        type: Type.OBJECT,

        properties: {
          indispensableFeatures: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                name: {
                  type: Type.STRING,
                },

                description: {
                  type: Type.STRING,
                },

                userValue: {
                  type: Type.STRING,
                },
              },

              required: [
                "name",
                "description",
                "userValue",
              ],
            },
          },

          bonusFeatures: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                name: {
                  type: Type.STRING,
                },

                description: {
                  type: Type.STRING,
                },

                differentiator: {
                  type: Type.STRING,
                },
              },

              required: [
                "name",
                "description",
                "differentiator",
              ],
            },
          },

          userJourney: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                stepNumber: {
                  type: Type.INTEGER,
                },

                stepTitle: {
                  type: Type.STRING,
                },

                action: {
                  type: Type.STRING,
                },

                screenType: {
                  type: Type.STRING,
                },
              },

              required: [
                "stepNumber",
                "stepTitle",
                "action",
                "screenType",
              ],
            },
          },

          embeddedAiAgents: {
            type: Type.ARRAY,

            items: {
              type: Type.OBJECT,

              properties: {
                name: {
                  type: Type.STRING,
                },

                role: {
                  type: Type.STRING,
                },

                inAppTrigger: {
                  type: Type.STRING,
                },
              },

              required: [
                "name",
                "role",
                "inAppTrigger",
              ],
            },
          },

          architectureRecommendation: {
            type: Type.STRING,
          },
        },

        required: [
          "indispensableFeatures",
          "bonusFeatures",
          "userJourney",
          "embeddedAiAgents",
          "architectureRecommendation",
        ],
      };

    } else {
      return res.status(400).json({
        success: false,
        error: `moduleType invalide : ${String(moduleType)}`,
      });
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,

      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    const text = response.text?.trim();

    if (!text) {
      throw new Error(
        "Gemini a retourné une réponse vide."
      );
    }

    let parsedData: any;

    try {
      parsedData = JSON.parse(text);
    } catch (parseError) {
      console.error(
        "JSON Gemini invalide :",
        text
      );

      throw new Error(
        "Gemini a retourné un JSON invalide."
      );
    }

    return res.json({
      success: true,
      mode: "gemini_live",
      model: GEMINI_MODEL,
      data: parsedData,
    });

  } catch (error: any) {
    console.error(
      "Gemini API Error (/api/gemini/generate):",
      error
    );

    return res.status(502).json({
      success: false,
      mode: "gemini_error",
      error:
        error?.message ||
        "La requête Gemini a échoué.",
    });
  }
});

/**
 * ============================================================
 * PLAYGROUND — ROUTE PRINCIPALE
 * ============================================================
 */
app.post("/api/analyze", async (req, res) => {
  const {
    tab,
    language: requestedLanguage,
    parameters,
  } = req.body;

  const language = normalizeLanguage(
    requestedLanguage
  );

  if (!isValidTab(tab)) {
    return res.status(400).json({
      success: false,
      error:
        "Le champ 'tab' doit être automation, web_architect ou studio_app.",
    });
  }

  if (
    !parameters ||
    typeof parameters !== "object"
  ) {
    return res.status(400).json({
      success: false,
      error:
        "Le champ 'parameters' est obligatoire et doit être un objet.",
    });
  }

  const ai = getGeminiClient();

  if (!ai) {
    console.error(
      "GEMINI_API_KEY absente du serveur."
    );

    return res.status(503).json({
      success: false,
      mode: "gemini_unavailable",
      error:
        "Clé API Gemini non configurée sur le serveur. Vérifie GEMINI_API_KEY dans ton fichier .env puis redémarre le serveur.",
    });
  }

  let systemInstruction = "";
  let prompt = "";

  if (tab === "automation") {
    systemInstruction =
      language === "fr"
        ? `
Tu es un consultant senior en IA et automatisation des processus.

Tu dois produire un diagnostic personnalisé d'une entreprise.

Tu dois analyser les informations métier fournies par l'utilisateur
et construire une recommandation réellement adaptée.

N'utilise jamais de réponse générique.

Les données chiffrées telles que les gains de temps ou le retour
sur investissement doivent être présentées comme des estimations,
jamais comme des faits mesurés.

Réponds exclusivement au JSON demandé.
`
        : `
You are a senior AI and business-process automation consultant.

Produce a personalized diagnosis based on the business information
provided by the user.

Do not generate a generic response.

Numerical values such as time savings or return on investment must
be presented as estimates, never as measured facts.

Return only the requested JSON.
`;

    prompt =
      language === "fr"
        ? `
Analyse ce projet d'automatisation.

INFORMATIONS FOURNIES PAR L'UTILISATEUR :

${JSON.stringify(parameters, null, 2)}

À partir de ces informations :

- Identifie les 3 principaux points de friction.
- Explique leur impact opérationnel.
- Propose une architecture composée de 3 éléments ou assistants IA.
- Estime de manière prudente les gains potentiels.
- Définit 3 étapes de déploiement.
- Donne un score global de potentiel d'automatisation sur 100.
- Produis un résumé final directement exploitable par un entrepreneur.

IMPORTANT :
Les recommandations doivent dépendre réellement du secteur,
du volume, de l'équipe et des tâches décrites.
`
        : `
Analyze this automation project.

USER-PROVIDED INFORMATION:

${JSON.stringify(parameters, null, 2)}

Based on this information:

- Identify the 3 main friction points.
- Explain their operational impact.
- Propose a 3-element AI assistant/automation architecture.
- Estimate potential gains cautiously.
- Define 3 deployment phases.
- Give an overall automation potential score from 0 to 100.
- Produce a final summary useful to a business owner.

IMPORTANT:
Recommendations must actually depend on the industry, volume,
team size and tasks described.
`;

  } else if (tab === "web_architect") {
    systemInstruction =
      language === "fr"
        ? `
Tu es un architecte web senior, spécialiste UX, conversion,
positionnement digital et IA.

Tu dois concevoir une architecture de site complètement adaptée
au secteur et à l'objectif commercial donnés.

Ne réutilise pas une architecture générique.

Le style visuel doit être pris en considération.

Réponds exclusivement au JSON demandé.
`
        : `
You are a senior web architect specializing in UX, conversion,
digital positioning and AI.

Design a website architecture specifically adapted to the provided
business and commercial goal.

Do not reuse a generic website structure.

Take the requested visual style into account.

Return only the requested JSON.
`;

    prompt =
      language === "fr"
        ? `
Conçois une architecture web stratégique.

INFORMATIONS FOURNIES PAR L'UTILISATEUR :

${JSON.stringify(parameters, null, 2)}

Ton analyse doit notamment déterminer :

- une proposition de valeur forte ;
- une structure de 4 à 5 pages vraiment adaptées au projet ;
- les sections importantes de chaque page ;
- les appels à l'action ;
- 2 à 4 fonctionnalités ou agents IA utiles ;
- une stratégie de conversion cohérente avec l'objectif indiqué ;
- une synthèse finale exploitable.

Ne donne pas automatiquement les mêmes pages pour tous les métiers.

Un cabinet d'avocats, un restaurant, un SaaS, une maison d'hôtes
ou un coach doivent recevoir des architectures différentes.
`
        : `
Design a strategic website architecture.

USER-PROVIDED INFORMATION:

${JSON.stringify(parameters, null, 2)}

Your analysis must determine:

- a strong value proposition;
- a 4–5 page structure specifically adapted to the project;
- important sections for each page;
- calls to action;
- 2–4 useful AI features or agents;
- a conversion strategy aligned with the stated goal;
- a useful final synthesis.

Do not automatically return the same pages for every industry.

A law firm, restaurant, SaaS company, guesthouse or coach should
receive different website architectures.
`;

  } else {
    systemInstruction =
      language === "fr"
        ? `
Tu es un Product Manager senior spécialisé dans les applications
mobiles et les expériences utilisateur assistées par IA.

Tu dois concevoir une application à partir du problème réel décrit
par l'utilisateur.

Ne propose pas une application générique.

L'IA ne doit être proposée que lorsqu'elle apporte une vraie valeur.

Réponds exclusivement au JSON demandé.
`
        : `
You are a senior Product Manager specializing in mobile applications,
UX and AI-assisted user experiences.

Design an application based on the actual problem described by the user.

Do not propose a generic application.

Only use AI where it creates genuine value.

Return only the requested JSON.
`;

    prompt =
      language === "fr"
        ? `
Conçois un blueprint d'application mobile.

INFORMATIONS FOURNIES PAR L'UTILISATEUR :

${JSON.stringify(parameters, null, 2)}

Analyse :

- le problème utilisateur ;
- les utilisateurs cibles ;
- les plateformes demandées ;
- la fonctionnalité IA prioritaire.

Puis propose :

- 3 à 5 fonctionnalités indispensables ;
- 2 à 4 fonctionnalités bonus ;
- un parcours utilisateur en 4 étapes ;
- 2 à 3 agents IA embarqués ;
- une recommandation UX et architecture finale.

Les fonctionnalités doivent répondre au problème décrit.
`
        : `
Design a mobile application blueprint.

USER-PROVIDED INFORMATION:

${JSON.stringify(parameters, null, 2)}

Analyze:

- the user problem;
- target users;
- requested platforms;
- the priority AI capability.

Then propose:

- 3–5 essential features;
- 2–4 bonus features;
- a 4-step user journey;
- 2–3 embedded AI agents;
- a final UX and architecture recommendation.

Features must directly address the described problem.
`;
  }

  try {
    const response =
      await ai.models.generateContent({
        model: GEMINI_MODEL,

        contents: prompt,

        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: playgroundResponseSchema,
        },
      });

    const text = response.text?.trim();

    if (!text) {
      throw new Error(
        "Gemini a retourné une réponse vide."
      );
    }

    let parsedData: any;

    try {
      parsedData = JSON.parse(text);
    } catch (parseError) {
      console.error(
        "Réponse JSON invalide retournée par Gemini :",
        text
      );

      throw new Error(
        "La réponse de Gemini n'est pas un JSON valide."
      );
    }

    const requiredFields = [
      "title",
      "summary",
      "metrics",
      "diagnostics",
      "architecture",
      "gains",
      "phases",
      "rawBlueprint",
    ];

    const missingFields =
      requiredFields.filter(
        (field) =>
          parsedData[field] === undefined ||
          parsedData[field] === null
      );

    if (missingFields.length > 0) {
      console.error(
        "Champs manquants dans la réponse Gemini :",
        missingFields
      );

      throw new Error(
        `Réponse Gemini incomplète. Champs manquants : ${missingFields.join(
          ", "
        )}`
      );
    }

    if (!Array.isArray(parsedData.metrics)) {
      parsedData.metrics = [];
    }

    if (!Array.isArray(parsedData.diagnostics)) {
      parsedData.diagnostics = [];
    }

    if (!Array.isArray(parsedData.architecture)) {
      parsedData.architecture = [];
    }

    if (!Array.isArray(parsedData.phases)) {
      parsedData.phases = [];
    }

    return res.json({
      success: true,
      mode: "gemini_live",
      model: GEMINI_MODEL,
      data: parsedData,
    });
  } catch (error: any) {
    console.error(
      "=========================================="
    );

    console.error(
      "ERREUR GEMINI /api/analyze"
    );

    console.error(
      "=========================================="
    );

    console.error(
      "Message :",
      error?.message
    );

    console.error(
      "Nom :",
      error?.name
    );

    console.error(
      "Stack :",
      error?.stack
    );

    console.error(
      "Tab :",
      tab
    );

    console.error(
      "Language :",
      language
    );

    console.error(
      "Parameters :",
      parameters
    );

    return res.status(502).json({
      success: false,
      mode: "gemini_error",
      model: GEMINI_MODEL,
      error:
        error?.message ||
        "La requête Gemini a échoué.",
      details: {
        tab,
        language,
      },
    });
  }
});

/**
 * ============================================================
 * VITE
 * ============================================================
 */


/**
 * ============================================================
 * VALIDATION DES ROUTES SPA EN PRODUCTION
 * ============================================================
 *
 * Express doit distinguer une vraie route React d'une URL inconnue.
 * Les routes dynamiques de services sont connues localement.
 * Les articles sont vérifiés dans Supabase afin qu'un slug inexistant
 * reçoive réellement un HTTP 404.
 */
const PUBLIC_SERVICE_SLUGS = new Set([
  "guide-ia-pro",
  "web-dev",
  "ai-integration",
  "formation-agents-ia",
  "automation",
  "mobile-dev",
]);

const PUBLIC_EXACT_ROUTES = new Set([
  "/",
  "/fr",
  "/en",
  "/fr/accueil",
  "/fr/a-propos",
  "/fr/services",
  "/fr/portfolio",
  "/fr/audit-ia",
  "/fr/blog",
  "/fr/guide-ia-pro",
  "/fr/contact",
  "/fr/conditions-utilisation",
  "/fr/confidentialite",
  "/en/home",
  "/en/about",
  "/en/services",
  "/en/portfolio",
  "/en/ai-audit",
  "/en/blog",
  "/en/ai-pro-guide",
  "/en/contact",
  "/en/terms-of-use",
  "/en/privacy-policy",
  "/adminboss",
]);

function normalizeRequestPath(requestPath: string): string {
  const pathname = requestPath.split("?")[0].split("#")[0];
  const decoded = decodeURIComponent(pathname || "/");
  const withoutTrailingSlash =
    decoded.length > 1 ? decoded.replace(/\/+$/, "") : decoded;
  return withoutTrailingSlash.toLowerCase();
}

function isKnownStaticRoute(pathname: string): boolean {
  if (PUBLIC_EXACT_ROUTES.has(pathname)) return true;

  const parts = pathname.split("/").filter(Boolean);

  // /fr/services/:slug et /en/services/:slug
  if (
    parts.length === 3 &&
    (parts[0] === "fr" || parts[0] === "en") &&
    parts[1] === "services"
  ) {
    return PUBLIC_SERVICE_SLUGS.has(parts[2]);
  }

  return false;
}

interface PublicArticleMeta {
  id: string;
  slug: string;
  language: "fr" | "en";
  title: string;
  summary: string;
  cover_image?: string | null;
  published_at?: string | null;
  published_date?: string | null;
  scheduled_at?: string | null;
  status?: string | null;
}

function isPublicArticle(row: Pick<PublicArticleMeta, "status" | "scheduled_at"> & { scheduled_at?: string | null }): boolean {
  if (row.status === "draft") return false;
  if (row.status === "scheduled") {
    return Boolean(row.scheduled_at && new Date(row.scheduled_at).getTime() <= Date.now());
  }
  return true;
}

async function getPublicArticleMeta(pathname: string): Promise<PublicArticleMeta | null> {
  const parts = pathname.split("/").filter(Boolean);

  if (
    parts.length !== 3 ||
    (parts[0] !== "fr" && parts[0] !== "en") ||
    parts[1] !== "blog"
  ) {
    return null;
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL?.trim();
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl || !supabaseAnonKey) return null;

  const language = parts[0];
  const slug = parts[2];

  try {
    const endpoint =
      `${supabaseUrl.replace(/\/+$/, "")}/rest/v1/blog_posts` +
      `?select=id,slug,language,title,summary,cover_image,published_at,published_date,status,scheduled_at` +
      `&slug=eq.${encodeURIComponent(slug)}` +
      `&language=eq.${language}&limit=1`;

    const response = await fetch(endpoint, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });

    if (!response.ok) {
      console.warn(`[blog] Vérification article impossible (${response.status}) pour ${pathname}`);
      return null;
    }

    const rows = await response.json();
    const article = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    if (!article || !isPublicArticle(article)) return null;
    return article as PublicArticleMeta;
  } catch (error) {
    console.warn("[blog] Vérification article échouée :", error);
    return null;
  }
}

async function articleExists(pathname: string): Promise<boolean | null> {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length !== 3 || (parts[0] !== "fr" && parts[0] !== "en") || parts[1] !== "blog") {
    return null;
  }

  const article = await getPublicArticleMeta(pathname);
  return article ? true : false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function absoluteUrl(value: string | null | undefined): string {
  if (!value) return "https://capinakpado.com/og-default-image.png";
  try {
    return new URL(value, "https://capinakpado.com/").toString();
  } catch {
    return "https://capinakpado.com/og-default-image.png";
  }
}

function injectArticleMeta(html: string, article: PublicArticleMeta, pathname: string): string {
  const canonical = `https://capinakpado.com${pathname}`;
  const title = escapeHtml(article.title);
  const description = escapeHtml(article.summary || article.title);
  const image = escapeHtml(absoluteUrl(article.cover_image));
  const canonicalEscaped = escapeHtml(canonical);
  const locale = article.language === "fr" ? "fr_FR" : "en_US";
  const articleTime = article.published_at ? `<meta property="article:published_time" content="${escapeHtml(article.published_at)}" />` : "";

  const tags = `
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title} | Capin Akpado" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalEscaped}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:alt" content="${title}" />
    <meta property="og:locale" content="${locale}" />
    <meta property="og:site_name" content="Capin Akpado" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title} | Capin Akpado" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <link rel="canonical" href="${canonicalEscaped}" />
    ${articleTime}
  `;

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title} | Capin Akpado</title>`)
    .replace(/<meta name="description"[^>]*>/i, "")
    .replace(/<meta property="og:[^"]+"[^>]*>/gi, "")
    .replace(/<meta name="twitter:[^"]+"[^>]*>/gi, "")
    .replace(/<link rel="canonical"[^>]*>/i, "")
    .replace(/<\/head>/i, `${tags}\n  </head>`);
}

async function isKnownSpaRoute(pathname: string): Promise<boolean> {
  if (isKnownStaticRoute(pathname)) return true;

  const articleStatus = await articleExists(pathname);

  // null = impossible de vérifier ; on laisse React gérer la route.
  if (articleStatus === true) return true;
  if (articleStatus === false) return false;

  // Une route /blog/:slug dont Supabase n'est pas disponible doit
  // continuer à charger React pour conserver le comportement actuel.
  const parts = pathname.split("/").filter(Boolean);
  if (
    parts.length === 3 &&
    (parts[0] === "fr" || parts[0] === "en") &&
    parts[1] === "blog"
  ) {
    return true;
  }

  return false;
}

async function startServer() {
  if (
    process.env.NODE_ENV !== "production"
  ) {
    const vite =
      await createViteServer({
        server: {
          middlewareMode: true,
        },

        appType: "spa",
      });

    app.use(vite.middlewares);
  } else {
    const distPath =
      path.join(
        process.cwd(),
        "dist"
      );

    // MISE EN CACHE LONGUE DURÉE POUR LES FICHIERS VITE (JS, CSS, IMAGES)
    app.use(
      express.static(distPath, {
        maxAge: "1y",
        immutable: true,
        index: false,
      })
    );

    // PAS DE CACHE POUR INDEX.HTML.
    //
    // Pour une URL React inconnue, on sert le shell React avec le statut
    // HTTP 404. Le composant NotFound.tsx pourra alors afficher la page
    // 404 sans rediriger l'utilisateur vers l'accueil.
    app.get("*", async (req, res) => {
      const pathname = normalizeRequestPath(req.path);
      const knownRoute = await isKnownSpaRoute(pathname);

      res.setHeader("Cache-Control", "no-cache");

      if (!knownRoute) {
        res.status(404);
      }

      const articleMeta = await getPublicArticleMeta(pathname);
      if (articleMeta) {
        try {
          const indexHtml = await fs.promises.readFile(path.join(distPath, "index.html"), "utf8");
          return res
            .type("html")
            .send(injectArticleMeta(indexHtml, articleMeta, pathname));
        } catch (error) {
          console.error("[blog] Impossible de préparer les métadonnées sociales :", error);
        }
      }

      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(
    PORT,
    "0.0.0.0",
    () => {
      console.log(
        `Portfolio & AI Playground server running at http://0.0.0.0:${PORT}`
      );

      console.log(
        `Gemini model: ${GEMINI_MODEL}`
      );

      console.log(
        `Gemini API key configured: ${Boolean(
          process.env.GEMINI_API_KEY?.trim()
        )}`
      );
    }
  );
}

startServer();