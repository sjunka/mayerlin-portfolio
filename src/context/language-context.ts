import { createContext, use } from 'react'
import type { Lang } from '@/i18n'

export interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
  isLangPending: boolean
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage() {
  const ctx = use(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
