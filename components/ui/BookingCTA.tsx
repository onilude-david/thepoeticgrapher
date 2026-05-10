'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { WHATSAPP_URL } from '@/lib/data'

export function BookingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-6 md:right-8 z-[700]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-sans text-white hover:bg-white hover:text-ink transition-colors duration-350 ease-editorial"
            style={{
              fontSize: 10,
              letterSpacing: '0.18em',
              fontWeight: 600,
              textTransform: 'uppercase',
              backgroundColor: '#111111',
              padding: '14px 24px',
              border: '1px solid #2A2A2A',
              whiteSpace: 'nowrap',
            }}
            aria-label="Book a photography session via WhatsApp"
          >
            Book a Session
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
