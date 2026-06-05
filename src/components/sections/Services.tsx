import { services } from '@/data/services'
import { useTranslation } from '@/hooks/useTranslation'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import { StaggerContainer } from '@/components/shared/StaggerContainer'
import { StaggerItem } from '@/components/shared/StaggerItem'

export function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="bg-bg-section py-24 px-[6%]">
      <AnimatedSection className="max-w-3xl">
        <SectionHeading tag={t.services.tag} title={t.services.title} />
      </AnimatedSection>

      <StaggerContainer className="mt-14 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
        {services.map(({ num, Icon, key }) => {
          const s = t.services.items[key]
          return (
            <StaggerItem key={key}>
              <article className="group relative h-full overflow-hidden rounded-lg border border-primary/15 bg-card p-[2rem_1.8rem] transition-all duration-300 hover:-translate-y-[5px] hover:border-primary/30 hover:shadow-[0_12px_30px_rgba(31,78,91,0.12)]">
                <span
                  className="pointer-events-none absolute right-5 top-4 font-serif font-light text-5xl text-primary/[0.07]"
                  aria-hidden="true"
                >
                  {num}
                </span>
                <Icon size={28} className="text-accent" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-xl text-primary">{s.title}</h3>
                <p className="mt-2 font-sans text-[0.88rem] leading-[1.7] text-muted-foreground">
                  {s.desc}
                </p>
                <span
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </article>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </section>
  )
}
