'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { fadeUp } from '@/lib/animations'
import type { Variants } from 'motion/react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
  once?: boolean
  variants?: Variants
}

export function Reveal({
  children,
  className,
  delay = 0,
  threshold = 0.2,
  once = true,
  variants = fadeUp,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
