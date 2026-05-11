'use client'

import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface Tilt3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  perspective?: number
}

export function Tilt3D({
  children,
  className,
  intensity = 12,
  perspective = 900,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const cfg = { stiffness: 180, damping: 22, mass: 0.5 }
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [intensity, -intensity]), cfg)
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-intensity, intensity]), cfg)

  useEffect(() => {
    if (shouldReduce || !ref.current) return
    const el = ref.current
    function update() {
      el.style.transform = `perspective(${perspective}px) rotateX(${rotX.get()}deg) rotateY(${rotY.get()}deg)`
    }
    const unX = rotX.on('change', update)
    const unY = rotY.on('change', update)
    return () => { unX(); unY() }
  }, [perspective, rotX, rotY, shouldReduce])

  if (shouldReduce) return <div className={cn(className)}>{children}</div>

  return (
    <div
      ref={ref}
      className={cn(className)}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        rawX.set((e.clientX - r.left) / r.width - 0.5)
        rawY.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => {
        rawX.set(0)
        rawY.set(0)
      }}
    >
      {children}
    </div>
  )
}
