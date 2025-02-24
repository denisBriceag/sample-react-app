import { WrapperProps } from "../../types/props.type.ts";
import { ReactElement, useState } from "react";
import {
  langs,
  Language,
  LanguageContext,
  LanguageContextType,
  languageMap,
} from "./language.context.ts";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";

export default function LanguageProvider({
  children,
}: WrapperProps): ReactElement {
  const [langConfig, setLangConfig] = useState<
    Omit<LanguageContextType, "switchLang" | "moment">
  >({
    language: (localStorage.getItem("lang") as Language) ?? Language.ENGLISH,
    locale:
      languageMap[
        (localStorage.getItem("lang") as Language) ?? Language.ENGLISH
      ],
  });
  const { i18n } = useTranslation();

  function handleLanguageSwitch(language: keyof typeof Language): void {
    setLangConfig({
      language: Language[language],
      locale: languageMap[language],
    });

    void i18n.changeLanguage(langs[language]);

    localStorage.setItem("lang", language);
  }

  return (
    <ConfigProvider locale={langConfig.locale}>
      <LanguageContext.Provider
        value={{
          language: langConfig.language,
          locale: langConfig.locale,
          switchLang: (language: keyof typeof Language) =>
            handleLanguageSwitch(language),
        }}
      >
        {children}
      </LanguageContext.Provider>
    </ConfigProvider>
  );
}
