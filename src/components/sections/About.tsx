import { credentials } from '@/data/credentials'
import { useTranslation } from '@/hooks/useTranslation'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { StaggerContainer } from '@/components/shared/StaggerContainer'
import { StaggerItem } from '@/components/shared/StaggerItem'

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="bg-card py-24 px-[6%]">
      <AnimatedSection className="max-w-3xl">
        <SectionHeading tag={t.about.tag} title={t.about.title} />
        <p className="mt-6 max-w-[640px] font-sans text-[0.92rem] leading-[1.85] text-muted-foreground">
          {t.about.body}
        </p>
      </AnimatedSection>

      <StaggerContainer className="mt-14 grid grid-cols-1 nav:grid-cols-3 gap-5">
        {credentials.map(({ Icon, key }) => {
          const c = t.about.credentials[key]
          return (
            <StaggerItem key={key}>
              <article className="group relative h-full overflow-hidden rounded-lg border border-primary/15 bg-background p-[1.8rem_1.5rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(31,78,91,0.10)]">
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <Icon size={28} className="text-accent" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-xl text-primary">{c.title}</h3>
                <p className="mt-2 font-sans text-[0.88rem] leading-[1.7] text-muted-foreground">
                  {c.subtitle}
                </p>
              </article>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </section>
  )
}
