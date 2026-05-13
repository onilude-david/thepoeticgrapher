'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useEffect, useState } from 'react'

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
  const [useNativeScroll, setUseNativeScroll] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)')
    const sync = () => setUseNativeScroll(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.scrollMode = useNativeScroll ? 'native' : 'lenis'
    return () => {
      delete document.documentElement.dataset.scrollMode
    }
  }, [useNativeScroll])

  if (useNativeScroll) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.15,
        syncTouch: false,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        autoRaf: false,
      }}
    >
      <GSAPLenisBridge />
      {children}
    </ReactLenis>
  )
}
