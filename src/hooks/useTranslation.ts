import { useLanguage } from '@/context/language-context'
import { translations } from '@/i18n'

export function useTranslation() {
  const { lang } = useLanguage()
  return { t: translations[lang], lang }
}
