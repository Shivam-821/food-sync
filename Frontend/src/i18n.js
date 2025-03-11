import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mni from "./locales/mni.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    mni: { translation: mni },
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: { escapeValue: false },
});

export default i18n;
