import { memo, useCallback, type Ref } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

const directionMap = {
  up: { y: 40, x: 0 },
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  none: { x: 0, y: 0 },
}

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  ref?: Ref<HTMLDivElement>
}

export const AnimatedSection = memo(function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  ref: forwardedRef,
}: AnimatedSectionProps) {
  const prefersReduced = useReducedMotion()
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      inViewRef(node)
      if (typeof forwardedRef === 'function') {
        forwardedRef(node)
      } else if (forwardedRef) {
        ;(forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      }
    },
    [inViewRef, forwardedRef],
  )

  const initial = prefersReduced
    ? { opacity: 1, x: 0, y: 0 }
    : { opacity: 0, ...directionMap[direction] }

  const animate = prefersReduced
    ? { opacity: 1, x: 0, y: 0 }
    : inView
      ? { opacity: 1, x: 0, y: 0 }
      : { opacity: 0, ...directionMap[direction] }

  return (
    <m.div
      ref={setRef}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={cn(className)}
    >
      {children}
    </m.div>
  )
})
AnimatedSection.displayName = 'AnimatedSection'
