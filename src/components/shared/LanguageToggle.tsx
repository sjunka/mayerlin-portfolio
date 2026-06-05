import { useLanguage } from '@/context/language-context'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/lib/utils'

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggleLang } = useLanguage()
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.nav.langLabel}
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-primary/20 px-3 py-1.5',
        'font-sans text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground',
        'hover:border-accent hover:text-accent transition-colors duration-200',
        className,
      )}
    >
      {lang === 'es' ? 'EN' : 'ES'}
    </button>
  )
}
