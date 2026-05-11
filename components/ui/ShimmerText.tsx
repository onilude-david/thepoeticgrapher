'use client'

import { cn } from '@/lib/utils'

interface ShimmerTextProps {
  text: string
  className?: string
  textClassName?: string
}

export function ShimmerText({ text, className, textClassName = 'text-white/50' }: ShimmerTextProps) {
  return (
    <span className={cn('relative inline-block', className)}>
      <span className={textClassName}>{text}</span>
      <span aria-hidden className="shimmer-overlay animate-shimmer">
        {text}
      </span>
    </span>
  )
}
