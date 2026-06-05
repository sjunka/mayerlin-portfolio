import { memo } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const StaggerItem = memo(function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const prefersReduced = useReducedMotion()

  return (
    <m.div
      className={cn(className)}
      variants={
        prefersReduced
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : {
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
              },
            }
      }
    >
      {children}
    </m.div>
  )
})
StaggerItem.displayName = 'StaggerItem'
