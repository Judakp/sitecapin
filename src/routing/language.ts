import type { Language } from "../types";

export function detectBrowserLanguage(): Language {
  if (typeof navigator === "undefined") {
    return "fr";
  }

  const browserLanguages = [
    navigator.language,
    ...(navigator.languages || []),
  ];

  for (const language of browserLanguages) {
    const normalizedLanguage = language.toLowerCase();

    if (normalizedLanguage.startsWith("fr")) {
      return "fr";
    }

    if (normalizedLanguage.startsWith("en")) {
      return "en";
    }
  }

  return "en";
}