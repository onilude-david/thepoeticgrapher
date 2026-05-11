'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useEffect } from 'react'

function GSAPLenisBridge() {
  const lenis = useLenis(() => {
    ScrollTrigger.update()
  })

  useEffect(() => {
    function update(time: number) {
      lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => gsap.ticker.remove(update)
  }, [lenis])

  return null
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.5,
        syncTouch: true,
        autoRaf: false,
      }}
    >
      <GSAPLenisBridge />
      {children}
    </ReactLenis>
  )
}
