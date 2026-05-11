'use client'

import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

const TERMS = [
  'PORTRAIT', 'CONVOCATION', 'EVENT', 'EDITORIAL',
  'MOMENTS', 'LIGHT', 'LAGOS', 'LENS', 'STUDIO', 'POETRY',
]

function Track({
  reverse = false,
  speed = '32s',
}: {
  reverse?: boolean
  speed?: string
}) {
  const doubled = [...TERMS, ...TERMS]
  return (
    <div className="overflow-hidden">
      <div
        className={cn(
          'flex whitespace-nowrap will-change-transform',
          reverse ? 'animate-marquee-rev' : 'animate-marquee',
        )}
        style={{ animationDuration: speed }}
        aria-hidden="true"
      >
        {doubled.map((term, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span
              className="font-sans uppercase text-white/20 tracking-[0.35em]"
              style={{ fontSize: 10 }}
            >
              {term}
            </span>
            <span className="mx-5 text-white/10" style={{ fontSize: 8 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

interface MarqueeStripProps {
  className?: string
}

export function MarqueeStrip({ className }: MarqueeStripProps) {
  const shouldReduce = useReducedMotion()
  if (shouldReduce) return null

  return (
    <div
      className={cn('py-3 border-t border-white/8 flex flex-col gap-1.5', className)}
      aria-hidden="true"
    >
      <Track speed="32s" />
      <Track reverse speed="40s" />
    </div>
  )
}
