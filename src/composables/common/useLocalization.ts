import { useI18n } from 'vue-i18n'
import { useStorage } from './useStorage'
import { LOCALE } from '@/common/constant'

export const useLocalization = () => {
  const i18n = useI18n()

  const changeLocalization = (locale: string) => {
    i18n.locale.value = locale
    const [_locale, setLocale] = useStorage<string>(LOCALE)
    setLocale(locale)
  }

  const changeToEnglish = () => {
    changeLocalization('en')
  }
  const changeToDutch = () => {
    changeLocalization('nl')
  }

  return { changeLocalization, changeToEnglish, changeToDutch }
}
