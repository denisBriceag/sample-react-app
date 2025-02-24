import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import { langs, Language } from "./core/providers/language/language.context.ts";

const initialLanguage: Language =
  (localStorage.getItem("lang") as Language) ?? Language.ENGLISH;

export default i18next
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: langs[initialLanguage],
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "../locales/{{lng}}.json",
    },
  });
