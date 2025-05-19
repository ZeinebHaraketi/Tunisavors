'use client'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        common: {
          welcome: 'Welcome to TuniSavors!',
        },
      },
      fr: {
        common: {
          welcome: 'Bienvenue sur TuniSavors !',
        },
      },
      es: {
        common: {
          welcome: '¡Bienvenido a TuniSavors!',
        },
      },
    },
  })

export default i18n
