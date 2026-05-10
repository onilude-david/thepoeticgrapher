'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Instagram, MessageCircle } from 'lucide-react'
import { INSTAGRAM_URL, WHATSAPP_URL } from '@/lib/data'

interface NavLink {
  label: string
  href: string
}

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  links: NavLink[]
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  // Focus trap and ESC key
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[900] flex flex-col"
          style={{ backgroundColor: '#080808' }}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Close button */}
          <div className="flex justify-end px-6 py-5">
            <button
              ref={closeRef}
              onClick={onClose}
              className="text-white p-2 -mr-2"
              aria-label="Close navigation menu"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col justify-center flex-1 px-10 pb-20">
            <ul className="list-none space-y-2">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1 + i * 0.05,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="font-serif text-white block py-2 hover:text-white/60 transition-colors duration-300"
                    style={{ fontSize: 48, fontWeight: 400, lineHeight: 1.1 }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Social links */}
            <motion.div
              className="flex gap-5 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/70 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/70 transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} strokeWidth={1.5} />
              </a>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
