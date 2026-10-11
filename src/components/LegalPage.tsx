import React from "react";
import { ArrowLeft, ShieldCheck, Scale } from "lucide-react";
import { SEO } from "./SEO";
import type { Language, ThemeMode } from "../types";

interface LegalPageProps {
  type: "terms" | "privacy";
  language: Language;
  theme: ThemeMode;
  onBack: () => void;
}

const LAST_UPDATED = "23 septembre 2026";

export const LegalPage: React.FC<LegalPageProps> = ({
  type,
  language,
  theme,
  onBack,
}) => {
  const fr = language === "fr";
  const isTerms = type === "terms";

  const title = isTerms
    ? fr
      ? "Conditions Générales d'Utilisation"
      : "Terms of Use"
    : fr
      ? "Politique de confidentialité"
      : "Privacy Policy";

  const description = isTerms
    ? fr
      ? "Conditions d'utilisation du site capinakpado.com."
      : "Terms governing the use of capinakpado.com."
    : fr
      ? "Informations sur la collecte, l'utilisation et la protection des données personnelles sur capinakpado.com."
      : "Information about the collection, use and protection of personal data on capinakpado.com.";

  const headingClass =
    theme === "dark" ? "text-white" : "text-slate-900";
  const bodyClass =
    theme === "dark" ? "text-zinc-300" : "text-slate-600";
  const cardClass =
    theme === "dark"
      ? "border-white/10 bg-white/[0.03]"
      : "border-slate-200 bg-white";

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SEO
        title={`${title} | Capin Akpado`}
        description={description}
        language={language}
        url={`https://capinakpado.com/${language}/${isTerms ? (fr ? "conditions-utilisation" : "terms-of-use") : (fr ? "confidentialite" : "privacy-policy")}`}
      />

      <button
        type="button"
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-500 hover:text-blue-400"
      >
        <ArrowLeft className="h-4 w-4" />
        {fr ? "Retour au site" : "Back to site"}
      </button>

      <header
        className={`mb-10 border-b pb-8 ${
          theme === "dark" ? "border-white/10" : "border-slate-200"
        }`}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-500">
          {isTerms ? (
            <Scale className="h-3.5 w-3.5" />
          ) : (
            <ShieldCheck className="h-3.5 w-3.5" />
          )}
          {isTerms
            ? fr
              ? "Conditions"
              : "Terms"
            : fr
              ? "Données personnelles"
              : "Personal data"}
        </div>

        <h1 className={`text-3xl font-extrabold tracking-tight sm:text-5xl ${headingClass}`}>
          {title}
        </h1>

        <p className={`mt-4 text-sm ${bodyClass}`}>
          {fr ? "Dernière mise à jour :" : "Last updated:"} {LAST_UPDATED}
        </p>
      </header>

      {isTerms ? (
        <TermsContent
          fr={fr}
          cardClass={cardClass}
          bodyClass={bodyClass}
          headingClass={headingClass}
        />
      ) : (
        <PrivacyContent
          fr={fr}
          cardClass={cardClass}
          bodyClass={bodyClass}
          headingClass={headingClass}
        />
      )}
    </article>
  );
};

function Section({
  number,
  title,
  children,
  cardClass,
  bodyClass,
  headingClass,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  cardClass: string;
  bodyClass: string;
  headingClass: string;
}) {
  return (
    <section className={`rounded-2xl border p-6 sm:p-8 ${cardClass}`}>
      <h2 className={`text-lg font-bold sm:text-xl ${headingClass}`}>
        <span className="mr-2 font-mono text-blue-500">{number}.</span>
        {title}
      </h2>
      <div className={`mt-4 space-y-3 text-sm leading-7 ${bodyClass}`}>
        {children}
      </div>
    </section>
  );
}

function TermsContent({
  fr,
  cardClass,
  bodyClass,
  headingClass,
}: {
  fr: boolean;
  cardClass: string;
  bodyClass: string;
  headingClass: string;
}) {
  return (
    <div className="space-y-5">
      <Section number="1" title={fr ? "Objet et champ d'application" : "Purpose and scope"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Les présentes Conditions Générales d'Utilisation (CGU) encadrent l'accès et l'utilisation du site capinakpado.com, édité par Capin Judicael Akpado. Le site présente des services de développement web, mobile, IA et automatisation, ainsi que des contenus éditoriaux et des démonstrations interactives." : "These Terms of Use govern access to and use of capinakpado.com, operated by Capin Judicael Akpado. The site presents web, mobile, AI and automation services, together with editorial content and interactive demonstrations."}</p>
        <p>{fr ? "Les prestations commerciales éventuellement commandées font l'objet de devis, contrats ou conditions particulières distincts. Les présentes CGU ne remplacent pas ces documents." : "Any commercial services ordered are governed by separate quotations, contracts or specific terms. These Terms of Use do not replace those documents."}</p>
      </Section>

      <Section number="2" title={fr ? "Accès au site" : "Access to the site"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "L'accès au site est en principe gratuit, hors coûts d'accès à Internet ou aux services de télécommunication supportés par l'utilisateur. Certaines fonctionnalités, notamment les outils d'IA, peuvent être soumises à des limites techniques ou de disponibilité." : "Access to the site is generally free, excluding Internet or telecommunications costs borne by the user. Certain features, including AI tools, may be subject to technical or availability limits."}</p>
      </Section>

      <Section number="3" title={fr ? "Utilisation acceptable" : "Acceptable use"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "L'utilisateur s'engage notamment à ne pas :" : "Users agree in particular not to:"}</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>{fr ? "utiliser le site à des fins illégales ou frauduleuses ;" : "use the site for unlawful or fraudulent purposes;"}</li>
          <li>{fr ? "tenter de compromettre sa sécurité ou celle de ses services ;" : "attempt to compromise the security of the site or its services;"}</li>
          <li>{fr ? "surcharger, perturber ou contourner volontairement les mécanismes techniques ;" : "intentionally overload, disrupt or circumvent technical mechanisms;"}</li>
          <li>{fr ? "soumettre aux outils d'IA des informations dont il n'est pas autorisé à disposer ou qu'il ne souhaite pas transmettre à un service tiers." : "submit to AI tools information they are not authorized to provide or do not wish to transmit to a third-party service."}</li>
        </ul>
      </Section>

      <Section number="4" title={fr ? "Contenus et propriété intellectuelle" : "Content and intellectual property"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Sauf indication contraire, les textes, éléments graphiques, logos, interfaces, code et contenus originaux du site sont protégés par les règles applicables de propriété intellectuelle. Toute reproduction ou réutilisation substantielle sans autorisation préalable est interdite." : "Unless otherwise stated, the site's texts, graphics, logos, interfaces, code and original content are protected by applicable intellectual-property rules. Substantial reproduction or reuse without prior authorization is prohibited."}</p>
        <p>{fr ? "Les liens vers des sites tiers restent soumis aux conditions et politiques de ces tiers." : "Links to third-party websites remain subject to those third parties' own terms and policies."}</p>
      </Section>

      <Section number="5" title={fr ? "Outils d'intelligence artificielle" : "Artificial intelligence tools"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Les résultats produits par les fonctionnalités d'IA sont générés à partir des informations saisies et de modèles ou services d'IA accessibles au service. Ils sont fournis à titre informatif et ne constituent pas, sauf accord écrit distinct, un conseil professionnel, juridique, financier, médical ou une garantie de résultat." : "Outputs generated by AI features are based on user-provided information and AI models or services used by the platform. They are provided for informational purposes and do not constitute professional, legal, financial or medical advice, nor a guarantee of results, unless separately agreed in writing."}</p>
        <p>{fr ? "L'utilisateur doit éviter de transmettre des données sensibles, confidentielles ou appartenant à des tiers lorsqu'il n'a pas l'autorisation de les transmettre." : "Users should avoid submitting sensitive, confidential or third-party information when they do not have authorization to share it."}</p>
      </Section>

      <Section number="6" title={fr ? "Disponibilité et responsabilité" : "Availability and liability"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Des interruptions peuvent survenir pour maintenance, mise à jour, sécurité, défaillance d'un fournisseur ou événement indépendant de la volonté de l'éditeur. Des mesures raisonnables sont prises pour maintenir le site disponible et sécurisé." : "Interruptions may occur due to maintenance, updates, security events, provider failures or circumstances beyond the operator's control. Reasonable measures are taken to keep the site available and secure."}</p>
        <p>{fr ? "Les informations publiées sont fournies à titre général et ne remplacent pas une analyse adaptée à une situation particulière." : "Published information is provided for general purposes and does not replace an analysis tailored to a specific situation."}</p>
      </Section>

      <Section number="7" title={fr ? "Modification des CGU" : "Changes to these Terms"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Ces CGU peuvent être mises à jour lorsque le site, ses services ou le cadre juridique évoluent. La date de mise à jour indiquée en tête de page permet d'identifier la version applicable." : "These Terms may be updated when the site, its services or the legal framework changes. The update date at the top of the page identifies the applicable version."}</p>
      </Section>

      <Section number="8" title={fr ? "Droit applicable et contact" : "Applicable law and contact"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Sous réserve des règles impératives applicables à l'utilisateur, les présentes CGU sont régies par le droit de la République du Bénin. Pour toute question relative au site : contact@capinakpado.com." : "Subject to mandatory rules applicable to the user, these Terms are governed by the laws of the Republic of Benin. For questions about the site: contact@capinakpado.com."}</p>
      </Section>

      <p className={`text-xs leading-6 ${bodyClass}`}>{fr ? "Document d'information générale : il ne remplace pas une validation juridique personnalisée lorsque votre activité, vos contrats ou votre public imposent des obligations particulières." : "General information document: it does not replace tailored legal review where your business, contracts or audience create specific legal requirements."}</p>
    </div>
  );
}

function PrivacyContent({
  fr,
  cardClass,
  bodyClass,
  headingClass,
}: {
  fr: boolean;
  cardClass: string;
  bodyClass: string;
  headingClass: string;
}) {
  return (
    <div className="space-y-5">
      <Section number="1" title={fr ? "Responsable du traitement" : "Data controller"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Responsable : Capin Judicael Akpado. Localisation déclarée : Ouidah, Bénin. Contact relatif aux données personnelles : contact@capinakpado.com." : "Controller: Capin Judicael Akpado. Declared location: Ouidah, Benin. Privacy contact: contact@capinakpado.com."}</p>
        <p>{fr ? "Si une structure juridique, une adresse professionnelle ou un délégué à la protection des données est ultérieurement désigné, cette page sera mise à jour." : "If a legal entity, professional address or data protection officer is subsequently designated, this page will be updated."}</p>
      </Section>

      <Section number="2" title={fr ? "Données collectées" : "Data collected"} {...{cardClass, bodyClass, headingClass}}>
        <ul className="list-disc space-y-2 pl-5">
          <li>{fr ? "Formulaire de contact : nom, adresse e-mail, téléphone si renseigné, type de projet, budget si renseigné et message." : "Contact form: name, email address, phone if provided, project type, budget if provided and message."}</li>
          <li>{fr ? "Outils d'IA : informations saisies dans les formulaires du Playground afin de produire l'analyse demandée." : "AI tools: information entered into Playground forms to produce the requested analysis."}</li>
          <li>{fr ? "Préférences locales : langue, thème, contenus administratifs et autres préférences enregistrées dans le stockage local du navigateur." : "Local preferences: language, theme, administrative content and other preferences stored in the browser's local storage."}</li>
          <li>{fr ? "Données techniques nécessaires au fonctionnement et à la sécurité du service, selon la configuration de l'hébergeur et des prestataires techniques." : "Technical data necessary for service operation and security, depending on hosting and technical-provider configuration."}</li>
        </ul>
      </Section>

      <Section number="3" title={fr ? "Finalités et bases" : "Purposes and legal bases"} {...{cardClass, bodyClass, headingClass}}>
        <ul className="list-disc space-y-2 pl-5">
          <li>{fr ? "Répondre aux demandes envoyées via le formulaire de contact : mesures précontractuelles ou intérêt légitime selon le contexte." : "Respond to contact requests: pre-contractual measures or legitimate interest depending on context."}</li>
          <li>{fr ? "Fournir les fonctionnalités demandées, notamment les démonstrations IA : exécution du service demandé." : "Provide requested features, including AI demonstrations: performance of the requested service."}</li>
          <li>{fr ? "Sécuriser et maintenir le site : intérêt légitime et, le cas échéant, obligations légales." : "Secure and maintain the site: legitimate interest and, where applicable, legal obligations."}</li>
          <li>{fr ? "Traceurs optionnels : consentement préalable lorsqu'il est requis." : "Optional trackers: prior consent where required."}</li>
        </ul>
      </Section>

      <Section number="4" title={fr ? "Prestataires et destinataires" : "Providers and recipients"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Le formulaire de contact utilise Formspree pour acheminer les messages. Les fonctionnalités d'IA utilisent l'infrastructure Supabase et peuvent transmettre les informations nécessaires à la fonction d'analyse au service d'IA configuré côté serveur ou côté fonction. Le site peut également utiliser Calendly lorsqu'un utilisateur choisit un lien de réservation." : "The contact form uses Formspree to route messages. AI features use Supabase infrastructure and may transmit information required for the analysis function to the AI service configured on the server or function. The site may also use Calendly when a user chooses a booking link."}</p>
        <p>{fr ? "Les traitements de ces prestataires sont soumis à leurs propres conditions et politiques. La configuration exacte des fonctions Supabase/IA doit être vérifiée avant toute utilisation de données confidentielles." : "Those providers have their own terms and policies. The exact Supabase/AI function configuration should be verified before confidential information is used."}</p>
      </Section>

      <Section number="5" title={fr ? "Stockage local, cookies et traceurs" : "Local storage, cookies and trackers"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Le site utilise notamment localStorage pour mémoriser certaines préférences et contenus locaux. La préférence de la bannière elle-même est également enregistrée localement afin d'éviter de réafficher la bannière à chaque visite." : "The site uses localStorage to remember certain preferences and local content. The banner preference is also stored locally so the banner does not reappear on every visit."}</p>
        <p>{fr ? "Le site ne doit pas activer de traceurs optionnels nécessitant un consentement avant que ce consentement ait été recueilli. Si de nouveaux outils d'analyse, de publicité ou de réseaux sociaux sont ajoutés, cette politique et le mécanisme de consentement seront mis à jour." : "The site should not activate optional trackers requiring consent before that consent has been obtained. If analytics, advertising or social-media tools are added, this policy and the consent mechanism will be updated."}</p>
      </Section>

      <Section number="6" title={fr ? "Durées de conservation" : "Retention"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Les données de contact sont conservées pendant la durée nécessaire au traitement de la demande et, lorsque la relation commerciale est engagée, pendant les durées nécessaires à la gestion de cette relation et aux obligations légales applicables. Les données stockées localement restent sur le terminal jusqu'à leur suppression par l'utilisateur ou par l'application." : "Contact data is retained for as long as necessary to handle the request and, when a business relationship is established, for periods required to manage that relationship and comply with applicable legal obligations. Locally stored data remains on the device until deleted by the user or by the application."}</p>
      </Section>

      <Section number="7" title={fr ? "Vos droits" : "Your rights"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Selon la législation applicable, vous pouvez notamment demander l'accès, la rectification, la suppression, la limitation ou l'opposition au traitement de vos données, ainsi que l'exercice des autres droits prévus par le droit applicable." : "Depending on applicable law, you may request access, rectification, deletion, restriction or objection to processing, together with other rights provided by applicable law."}</p>
        <p>{fr ? "Pour exercer vos droits, écrivez à contact@capinakpado.com en précisant votre demande et les informations permettant de traiter celle-ci." : "To exercise your rights, write to contact@capinakpado.com and describe your request with enough information to process it."}</p>
        <p>{fr ? "Au Bénin, l'Autorité de Protection des Données Personnelles (APDP) est l'autorité compétente en matière de protection des données. Ses coordonnées officielles sont disponibles sur apdp.bj." : "In Benin, the Autorité de Protection des Données Personnelles (APDP) is the competent data-protection authority. Its official contact details are available on apdp.bj."}</p>
      </Section>

      <Section number="8" title={fr ? "Sécurité" : "Security"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Des mesures techniques et organisationnelles raisonnables sont mises en œuvre pour protéger les données. Aucun service en ligne ne pouvant garantir une sécurité absolue, l'utilisateur doit également éviter de transmettre des informations inutilement sensibles." : "Reasonable technical and organizational measures are used to protect data. No online service can guarantee absolute security, so users should also avoid submitting unnecessarily sensitive information."}</p>
      </Section>

      <Section number="9" title={fr ? "Transferts internationaux" : "International transfers"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Certains prestataires techniques utilisés par le site peuvent traiter des données depuis des pays différents du pays de l'utilisateur. Lorsque cela est applicable, les garanties et mécanismes de transfert requis par le droit applicable doivent être mis en place par le responsable du traitement et/ou le prestataire concerné." : "Some technical providers used by the site may process data from countries different from the user's country. Where applicable, the safeguards and transfer mechanisms required by applicable law must be implemented by the controller and/or relevant provider."}</p>
      </Section>

      <Section number="10" title={fr ? "Mise à jour de la politique" : "Policy updates"} {...{cardClass, bodyClass, headingClass}}>
        <p>{fr ? "Cette politique peut être modifiée lorsque les traitements, les prestataires ou la réglementation évoluent. La date de mise à jour figure en tête de page." : "This policy may be updated when processing activities, providers or regulations change. The update date appears at the top of the page."}</p>
      </Section>

      <p className={`text-xs leading-6 ${bodyClass}`}>{fr ? "Cette politique est une base adaptée aux fonctionnalités actuellement identifiées dans le projet transmis. Avant publication définitive, complétez notamment l'identité juridique exacte, l'hébergeur, les durées contractuelles précises et les formalités APDP qui vous sont applicables." : "This policy is a baseline adapted to the features identified in the supplied project. Before final publication, complete the exact legal identity, hosting provider, precise contractual retention periods and any APDP formalities applicable to you."}</p>
    </div>
  );
}
