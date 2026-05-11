'use client'

import { cn } from '@/lib/utils'

interface BorderBeamProps {
  className?: string
}

export function BorderBeam({ className }: BorderBeamProps) {
  return (
    <span
      aria-hidden
      className={cn('border-beam border-beam-active', className)}
    />
  )
}
