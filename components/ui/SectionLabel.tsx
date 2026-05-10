'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { cn } from '@/lib/utils'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

interface SectionLabelProps {
  text: string
  className?: string
  light?: boolean
}

export function SectionLabel({ text, className, light = false }: SectionLabelProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(text)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isInView || hasStarted.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    hasStarted.current = true
    const chars = text.split('')
    let elapsed = 0
    const duration = 600
    const interval = 40
    const resolved = new Array(chars.length).fill(false)

    const timer = setInterval(() => {
      elapsed += interval

      setDisplay(
        chars
          .map((char, i) => {
            if (char === ' ') return ' '
            if (resolved[i]) return char
            if (elapsed > (i / chars.length) * duration * 0.8) {
              resolved[i] = true
              return char
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (elapsed >= duration) {
        clearInterval(timer)
        setDisplay(text)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isInView, text])

  return (
    <span
      ref={ref}
      className={cn(
        'font-sans uppercase block',
        light ? 'text-white/50' : 'text-muted',
        className
      )}
      style={{ fontSize: 11, letterSpacing: '0.22em', fontWeight: 600, lineHeight: 1 }}
    >
      {display}
    </span>
  )
}
