import { profile } from '@/data/profile'
import { useTranslation } from '@/hooks/useTranslation'

export function Footer() {
  const { t } = useTranslation()

  const links = [
    { href: '#about', label: t.footer.links.about },
    { href: '#services', label: t.footer.links.services },
    { href: '#contact', label: t.footer.links.contact },
    { href: '#', label: t.footer.links.privacy },
    { href: '#', label: t.footer.links.terms },
  ]

  return (
    <footer className="bg-primary-dark border-t border-background/[0.08]">
      <div className="flex flex-col nav:flex-row items-center justify-between gap-4 px-[6%] py-6 text-center nav:text-left">
        <img
          src={profile.logo}
          alt={t.footer.logoAlt}
          className="h-9 w-auto opacity-70 brightness-0 invert"
        />
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {links.map((l, i) => (
            <li key={`${l.label}-${i}`}>
              <a
                href={l.href}
                className="font-sans text-[0.72rem] text-background/60 hover:text-background transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-sans text-[0.72rem] text-background/50">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
