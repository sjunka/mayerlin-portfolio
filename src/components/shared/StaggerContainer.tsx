import { memo } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export const StaggerContainer = memo(function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <m.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView || prefersReduced ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
        hidden: {},
      }}
    >
      {children}
    </m.div>
  )
})
StaggerContainer.displayName = 'StaggerContainer'
