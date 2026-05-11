'use client'

import { motion } from 'motion/react'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { CountUp } from '@/components/ui/CountUp'
import { HeroCanvas } from '@/components/ui/HeroCanvas'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { WHATSAPP_URL } from '@/lib/data'

const ease = [0.22, 1, 0.36, 1] as const

interface HeroProps {
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const d = 0.1 // base delay (after preloader)

  return (
    <section
      id="top"
      data-theme="dark"
      className="relative full-height w-full overflow-hidden"
      style={{ backgroundColor: '#080808' }}
      aria-label="Hero — ThePoeticGrapher Studios"
    >
      {/* ── 3D Canvas — desktop only ─────────────────────────────────────── */}
      <div className="hidden md:block absolute inset-0">
        <HeroCanvas ready={ready} />
      </div>

      {/* ── Gradient masks over canvas ───────────────────────────────────── */}
      {/* Left: solid black → transparent — covers the text column */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-y-0 left-0 z-[2] pointer-events-none"
        style={{
          width: '52%',
          background: 'linear-gradient(to right, #080808 45%, transparent 100%)',
        }}
      />
      {/* Top: nav fade */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: '15%',
          background: 'linear-gradient(to bottom, #080808 0%, transparent 100%)',
        }}
      />
      {/* Bottom: scroll fade */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: '10%',
          background: 'linear-gradient(to top, #080808 0%, transparent 100%)',
        }}
      />

      {/* ── Background wordmark ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 overflow-hidden pointer-events-none select-none hidden md:block"
        style={{ zIndex: 1 }}
      >
        <span
          className="font-serif text-white whitespace-nowrap"
          style={{
            fontSize: 'clamp(120px, 16vw, 200px)',
            fontWeight: 400,
            opacity: 0.03,
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            display: 'block',
            transform: 'translateY(20%)',
          }}
        >
          THEPOETICGRAPHER
        </span>
      </div>

      {/* ── Content grid ─────────────────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 min-h-[100dvh]">
        {/* Left column — text */}
        <div className="flex flex-col justify-center px-6 md:pl-16 md:pr-10 pt-28 pb-16 md:pt-0 md:pb-0">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: d, duration: 0.5 }}
          className="mb-8"
        >
          <SectionLabel text="Light. Camera. Poetry." light />
        </motion.div>

        {/* H1 */}
        <div className="mb-8">
          {ready && (
            <AnimatedHeading
              as="h1"
              triggerOnMount
              delay={d + 0.3}
              className="font-serif text-white text-hero leading-[0.93] tracking-[-0.03em]"
            >
              Framing Poetry, One Moment at a Time.
            </AnimatedHeading>
          )}
        </div>

        {/* Body */}
        <motion.p
          className="font-sans text-white/60 mb-8 max-w-sm"
          style={{ fontSize: 16, lineHeight: 1.75 }}
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: d + 1.2, duration: 0.8, ease }}
        >
          A minimal photography studio capturing portraits, milestones, events, and stories — with emotion, light, and intention.
        </motion.p>

        {/* Trust stat */}
        <motion.div
          className="mb-8 flex items-baseline gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: d + 1.35, duration: 0.8, ease }}
        >
          <span
            className="font-serif text-white"
            style={{ fontSize: 36, fontWeight: 400, lineHeight: 1 }}
          >
            {ready && <CountUp target={200} suffix="+" duration={1500} />}
          </span>
          <span
            className="font-sans text-white/40 uppercase"
            style={{ fontSize: 11, letterSpacing: '0.18em', fontWeight: 500 }}
          >
            happy clients
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          animate={ready ? { opacity: 1, clipPath: 'inset(0% 0 0 0)' } : {}}
          transition={{ delay: d + 1.5, duration: 0.8, ease }}
        >
          <Button
            as="a"
            variant="hero-ghost"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Session
          </Button>
          <Button as="a" variant="hero-ghost" href="#stories">
            View Stories
          </Button>
        </motion.div>
        </div>{/* end left column */}

        {/* Right column — empty; 3D canvas shows through from absolute layer */}
        <div className="hidden md:block" aria-hidden="true" />
      </div>{/* end grid */}

      {/* ── Mobile background image ──────────────────────────────────────── */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <ParallaxImage
          src="/images/Portraits/IMG_9777-2.jpeg"
          alt="Portrait"
          speed={0}
          priority
          className="absolute inset-0"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(8,8,8,0.85)' }} />
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: d + 2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span
          className="font-sans text-white/30 uppercase"
          style={{ fontSize: 9, letterSpacing: '0.2em' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-[1px] bg-white/20"
          style={{ height: 40 }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay: 0.5 }}
        />
      </motion.div>
    </section>
  )
}
