import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  tag: string
  title: React.ReactNode
  className?: string
  tagClassName?: string
  titleClassName?: string
}

export function SectionHeading({
  tag,
  title,
  className,
  tagClassName,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <span
        className={cn(
          'font-sans text-[0.72rem] uppercase tracking-[0.22em] text-accent',
          tagClassName,
        )}
      >
        {tag}
      </span>
      <h2
        className={cn(
          'font-serif font-light text-[clamp(1.9rem,3.5vw,2.8rem)] leading-tight text-primary',
          titleClassName,
        )}
      >
        {title}
      </h2>
    </div>
  )
}
