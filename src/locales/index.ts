import { createI18n } from 'vue-i18n'
import { enLocales } from './en'
import { nlLocales } from './nl'

const messages = {
  en: enLocales,
  nl: nlLocales
}

export const i18n = createI18n({
  locale: localStorage.getItem('lang') ?? 'en',
  legacy: false,
  messages,
  fallbackLocale: 'en',
  warnHtmlMessage: false
})
