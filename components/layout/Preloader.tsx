'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'develop' | 'release' | 'done'>('develop')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.remove('preloader-active')
      onComplete()
      return
    }

    document.body.classList.add('preloader-active')

    const t1 = setTimeout(() => setPhase('release'), 1850)
    const t2 = setTimeout(() => {
      setPhase('done')
      document.body.classList.remove('preloader-active')
      onComplete()
    }, 2650)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.classList.remove('preloader-active')
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{
            background:
              'radial-gradient(circle at 62% 42%, rgba(200,175,120,0.13), transparent 28%), radial-gradient(circle at 50% 50%, #15110f 0%, #080808 56%, #020202 100%)',
          }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          animate={
            phase === 'release'
              ? { clipPath: 'inset(0 0 100% 0)' }
              : { clipPath: 'inset(0 0 0% 0)' }
          }
          transition={
            phase === 'release'
              ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              : {}
          }
        >
          {/* Film grain */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '180px 180px',
            }}
            animate={{ x: [0, -18, 12, 0], y: [0, 10, -8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />

          {/* Aperture ring */}
          <motion.div
            aria-hidden="true"
            className="absolute h-[min(62vw,360px)] w-[min(62vw,360px)] rounded-full border border-white/10"
            initial={{ opacity: 0, scale: 0.55, rotate: 0 }}
            animate={{ opacity: [0, 0.7, 0.22], scale: [0.55, 1.05, 1], rotate: 120 }}
            transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-px w-[42%] origin-left bg-[#c8af78]/35"
                style={{ transform: `rotate(${i * 36}deg) translateX(22%)` }}
                initial={{ opacity: 0, scaleX: 0.2 }}
                animate={{ opacity: [0, 0.8, 0.22], scaleX: [0.2, 1.05, 0.72] }}
                transition={{ delay: 0.12 + i * 0.025, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </motion.div>

          {/* Developing scan */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 right-0 h-px bg-[#c8af78]/70 shadow-[0_0_32px_rgba(200,175,120,0.45)]"
            initial={{ top: '18%', opacity: 0 }}
            animate={{ top: ['18%', '78%'], opacity: [0, 1, 0] }}
            transition={{ delay: 0.25, duration: 1.35, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* Flash */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.22, 0] }}
            transition={{ times: [0, 0.66, 0.7, 1], duration: 1.75, ease: 'easeOut' }}
          />

          <AnimatePresence mode="wait">
            {phase === 'develop' && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.35, filter: 'blur(12px)' }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 select-none text-center"
              >
                <span
                  className="block font-serif text-white"
                  style={{ fontSize: 'clamp(56px, 18vw, 80px)', fontWeight: 400, letterSpacing: '0' }}
                >
                  TPG
                </span>
                <motion.span
                  className="mt-4 block font-sans text-[9px] font-semibold uppercase tracking-[0.28em] text-white/35"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  Light. Camera. Poetry.
                </motion.span>
                <motion.span
                  aria-hidden="true"
                  className="mx-auto mt-5 block h-px w-24 origin-left bg-[#c8af78]/60"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.58, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
