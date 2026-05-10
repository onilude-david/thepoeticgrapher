'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'logo-in' | 'logo-out' | 'done'>('logo-in')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.remove('preloader-active')
      onComplete()
      return
    }

    document.body.classList.add('preloader-active')

    const t1 = setTimeout(() => setPhase('logo-out'), 1000)
    const t2 = setTimeout(() => {
      setPhase('done')
      document.body.classList.remove('preloader-active')
      onComplete()
    }, 2000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ backgroundColor: '#080808' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          animate={
            phase === 'logo-out'
              ? { clipPath: 'inset(0 0 100% 0)' }
              : { clipPath: 'inset(0 0 0% 0)' }
          }
          transition={
            phase === 'logo-out'
              ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              : {}
          }
        >
          <AnimatePresence mode="wait">
            {phase === 'logo-in' && (
              <motion.div
                key="logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center select-none"
              >
                <span
                  className="text-white font-serif"
                  style={{ fontSize: '80px', fontWeight: 400, letterSpacing: '-0.02em' }}
                >
                  TPG
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
