'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Menu } from 'lucide-react'
import { MobileMenu } from './MobileMenu'

const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Stories', href: '#stories' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

export function Header({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[800] transition-all duration-300"
        initial={{ opacity: 0, y: -10 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <nav className="flex justify-between items-center max-w-outer mx-auto px-6 md:px-8 py-5 md:py-6">
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center gap-3 text-white no-underline group"
            aria-label="ThePoeticGrapher Studios — Home"
          >
            <span
              className="font-serif text-white leading-none"
              style={{ fontSize: 26, fontWeight: 400, letterSpacing: '-0.01em' }}
            >
              TPG
            </span>
            <span
              className="hidden md:block text-white/50 font-sans uppercase"
              style={{ fontSize: 9, letterSpacing: '0.22em', fontWeight: 600, paddingTop: 1 }}
            >
              | THEPOETICGRAPHER STUDIOS
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link font-sans text-white"
                  style={{ fontSize: 11, letterSpacing: '0.18em', fontWeight: 500, textTransform: 'uppercase' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-white p-2 -mr-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </nav>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
      />
    </>
  )
}
