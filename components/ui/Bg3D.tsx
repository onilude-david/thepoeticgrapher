'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface Bg3DProps {
  variant?: 'light' | 'dark'
  className?: string
}

export function Bg3D({ variant = 'light', className }: Bg3DProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const shapes = ref.current.querySelectorAll<HTMLElement>('.bg3d-shape')

    shapes.forEach((shape, i) => {
      gsap.set(shape, { transformPerspective: 700 })

      // Continuous slow rotation on each axis — each shape moves independently
      gsap.to(shape, {
        rotateX: `+=${30 + i * 15}`,
        rotateY: `+=${48 + i * 18}`,
        rotateZ: `+=${14 + i * 7}`,
        duration: 15 + i * 5,
        repeat: -1,
        ease: 'none',
      })

      // Slow vertical float (yoyo)
      gsap.to(shape, {
        y: `+=${10 + i * 4}`,
        duration: 3.8 + i * 0.9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
      })
    })

    // Scroll-driven depth parallax for the whole layer
    if (ref.current.parentElement) {
      gsap.to(ref.current, {
        y: -55,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }
  }, { scope: ref })

  // Color helper — ink-tinted for light sections, white-tinted for dark
  const a = (o: number) =>
    variant === 'dark'
      ? `rgba(255,255,255,${o})`
      : `rgba(58,48,38,${o})`

  return (
    <div
      ref={ref}
      className={cn('absolute inset-0 pointer-events-none overflow-hidden select-none', className)}
      aria-hidden="true"
    >
      {/* Large ring — top right */}
      <div
        className="bg3d-shape absolute rounded-full"
        style={{ width: 440, height: 440, border: `1px solid ${a(0.05)}`, top: '-14%', right: '-10%' }}
      />

      {/* Medium ring — bottom left */}
      <div
        className="bg3d-shape absolute rounded-full"
        style={{ width: 250, height: 250, border: `1px solid ${a(0.065)}`, bottom: '8%', left: '-5%' }}
      />

      {/* Small ring — center right */}
      <div
        className="bg3d-shape absolute rounded-full"
        style={{ width: 140, height: 140, border: `1px solid ${a(0.085)}`, top: '32%', right: '16%' }}
      />

      {/* Tiny ring — mid left */}
      <div
        className="bg3d-shape absolute rounded-full"
        style={{ width: 72, height: 72, border: `1px solid ${a(0.10)}`, top: '58%', left: '20%' }}
      />

      {/* XL ghost ring — lower center */}
      <div
        className="bg3d-shape absolute rounded-full"
        style={{ width: 600, height: 600, border: `1px solid ${a(0.028)}`, bottom: '-30%', left: '20%' }}
      />

      {/* Cross — bottom right */}
      <div
        className="bg3d-shape absolute"
        style={{ width: 100, height: 100, bottom: '22%', right: '14%' }}
      >
        <div
          className="absolute top-1/2 left-0 right-0 h-px"
          style={{ backgroundColor: a(0.08), transform: 'translateY(-50%)' }}
        />
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px"
          style={{ backgroundColor: a(0.08), transform: 'translateX(-50%)' }}
        />
      </div>

      {/* Cross — top left */}
      <div
        className="bg3d-shape absolute"
        style={{ width: 72, height: 72, top: '18%', left: '9%' }}
      >
        <div
          className="absolute top-1/2 left-0 right-0 h-px"
          style={{ backgroundColor: a(0.07), transform: 'translateY(-50%)' }}
        />
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px"
          style={{ backgroundColor: a(0.07), transform: 'translateX(-50%)' }}
        />
      </div>

      {/* Scattered dots */}
      {([
        { s: 5,  top: '22%', left: '36%',  o: 0.12 },
        { s: 3,  top: '74%', left: '56%',  o: 0.10 },
        { s: 7,  top: '44%', left: '11%',  o: 0.08 },
        { s: 4,  top: '14%', right: '36%', o: 0.11 },
        { s: 6,  top: '83%', right: '30%', o: 0.09 },
        { s: 3,  top: '50%', right: '6%',  o: 0.08 },
      ] as const).map((dot, i) => (
        <div
          key={i}
          className="bg3d-shape absolute rounded-full"
          style={{
            width: dot.s, height: dot.s,
            backgroundColor: a(dot.o),
            top: dot.top,
            left: 'left' in dot ? dot.left : undefined,
            right: 'right' in dot ? dot.right : undefined,
          }}
        />
      ))}
    </div>
  )
}
