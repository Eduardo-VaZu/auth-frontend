import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import enTranslation from '@/shared/locales/en/translation.json'
import esTranslation from '@/shared/locales/es/translation.json'

void i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    es: { translation: esTranslation },
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'es'],
  interpolation: { escapeValue: false },
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
  },
})

export default i18n
