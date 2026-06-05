import { m, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/lib/utils'

export function Hero() {
  const { t } = useTranslation()
  const prefersReduced = useReducedMotion()

  const fadeUp = (delay: number) => ({
    initial: prefersReduced ? {} : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  })

  return (
    <section
      id="hero"
      aria-label={t.hero.eyebrow}
      className="relative min-h-screen grid grid-cols-1 nav:grid-cols-2 items-center overflow-hidden"
    >
      {/* Right panel background tint */}
      <div
        className="hidden nav:block absolute inset-y-0 right-0 w-1/2 bg-bg-section"
        aria-hidden="true"
      />

      {/* Left — content */}
      <div className="relative z-10 px-[6%] nav:pl-[6%] nav:pr-12 pt-28 pb-16 nav:py-0">
        <m.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-accent" aria-hidden="true" />
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.22em] text-accent">
            {t.hero.eyebrow}
          </span>
        </m.div>

        <m.h1
          {...fadeUp(0.2)}
          className="font-serif font-light text-[clamp(2.6rem,4.5vw,4.2rem)] leading-[1.08] text-primary mb-6"
        >
          {t.hero.titlePre}
          <em className="text-accent italic">{t.hero.titleEm}</em>
        </m.h1>

        <m.p
          {...fadeUp(0.3)}
          className="max-w-[34rem] font-sans text-[0.92rem] leading-[1.85] text-muted-foreground mb-9"
        >
          {t.hero.description}
        </m.p>

        <m.div {...fadeUp(0.45)}>
          <a
            href="#contact"
            className={cn(
              'group inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5',
              'font-sans text-[0.82rem] font-medium uppercase tracking-[0.08em] text-accent-foreground',
              'hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-200',
              'shadow-lg shadow-accent/20',
            )}
          >
            {t.hero.cta}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </a>
        </m.div>
      </div>

      {/* Right — photo */}
      <div className="relative z-10 hidden nav:flex items-center justify-center px-12">
        <m.div
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-lg border border-primary/15 bg-gradient-to-br from-primary to-primary-light shadow-xl"
        >
          <img
            src={profile.photo}
            alt={t.hero.photoAlt}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </m.div>
      </div>
    </section>
  )
}
