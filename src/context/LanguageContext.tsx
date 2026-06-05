import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useTransition,
  type ReactNode,
} from 'react'
import type { Lang } from '@/i18n'
import { LanguageContext } from './language-context'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    // The inline script in index.html resolves the language before React loads
    // and writes it to document.documentElement.lang — read it here for a
    // flash-free first render.
    const fromDom = document.documentElement.lang as Lang
    if (fromDom === 'en' || fromDom === 'es') return fromDom
    const stored = localStorage.getItem('language') as Lang | null
    if (stored === 'en' || stored === 'es') return stored
    return navigator.language.startsWith('en') ? 'en' : 'es' // es default
  })

  const [isLangPending, startTransition] = useTransition()

  useEffect(() => {
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = useCallback(() => {
    startTransition(() => {
      setLangState((l) => (l === 'es' ? 'en' : 'es'))
    })
  }, [])

  const value = useMemo(
    () => ({ lang, toggleLang, isLangPending }),
    [lang, toggleLang, isLangPending],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
