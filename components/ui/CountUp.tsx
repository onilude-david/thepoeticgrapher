'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

interface CountUpProps {
  target: number
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({
  target,
  suffix = '',
  duration = 1500,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const shouldReduce = useReducedMotion()
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    if (shouldReduce) return

    started.current = true
    const start = performance.now()

    function easeOutQuad(t: number) {
      return t * (2 - t)
    }

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(easeOutQuad(progress) * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, shouldReduce, target, duration])

  const displayCount = shouldReduce && isInView ? target : count

  return (
    <span ref={ref} className={className}>
      {displayCount}
      {suffix}
    </span>
  )
}
