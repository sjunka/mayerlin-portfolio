import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '@/data/profile'
import { useTranslation } from '@/hooks/useTranslation'
import { LanguageToggle } from '@/components/shared/LanguageToggle'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#services', label: t.nav.services },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-primary/10 bg-background/95 backdrop-blur-[14px]">
      <a href="#main-content" className="skip-link">
        {t.nav.skipToContent}
      </a>
      <nav
        aria-label="Principal"
        className="flex items-center justify-between px-[6%] py-3"
      >
        <a href="#hero" className="flex items-center gap-2" aria-label={profile.brand}>
          <img src={profile.logo} alt={profile.brand} className="h-12 w-auto" />
        </a>

        {/* Desktop links */}
        <div className="hidden nav:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-sans text-[0.78rem] uppercase tracking-[0.08em] text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageToggle />
          <a
            href="#contact"
            className={cn(
              'inline-flex items-center rounded-md bg-accent px-[1.4rem] py-[0.55rem]',
              'font-sans text-[0.82rem] font-medium uppercase tracking-[0.08em] text-accent-foreground',
              'hover:bg-accent-dark transition-colors',
            )}
          >
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 nav:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary hover:bg-muted transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="nav:hidden border-t border-primary/10 bg-background px-[6%] py-4">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-sans text-sm uppercase tracking-[0.08em] text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-md bg-accent px-[1.4rem] py-[0.55rem] font-sans text-[0.82rem] font-medium uppercase tracking-[0.08em] text-accent-foreground hover:bg-accent-dark transition-colors"
              >
                {t.nav.cta}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
