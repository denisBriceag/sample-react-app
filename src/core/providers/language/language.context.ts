import { createContext, useContext } from "react";
import { Locale } from "antd/lib/locale";

import enUS from "antd/locale/en_US";
import ruRU from "antd/locale/ru_RU";

export enum Language {
  ENGLISH = "ENGLISH",
  RUSSIAN = "RUSSIAN",
}

export const languageMap: Record<keyof typeof Language, Locale> = {
  ENGLISH: enUS,
  RUSSIAN: ruRU,
};

export const langs: Record<keyof typeof Language, "en" | "ru"> = {
  ENGLISH: "en",
  RUSSIAN: "ru",
};

export interface LanguageContextType {
  language: Language;
  locale: Locale;
  switchLang: (language: keyof typeof Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: (localStorage.getItem("lang") as Language) ?? Language.ENGLISH,
  locale:
    languageMap[(localStorage.getItem("lang") as Language) ?? Language.ENGLISH],
  switchLang: () => {},
});

export const useLanguage: () => LanguageContextType = () => {
  const langContext = useContext<LanguageContextType>(LanguageContext);

  if (!langContext)
    throw new Error("langContext must be used withing a LanguageContext");

  return langContext;
};
