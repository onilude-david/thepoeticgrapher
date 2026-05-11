'use client'

import { motion } from 'motion/react'

import { Button } from '@/components/ui/Button'
import { CountUp } from '@/components/ui/CountUp'
import { HeroCanvas } from '@/components/ui/HeroCanvas'
import { MarqueeStrip } from '@/components/ui/MarqueeStrip'
import { ParallaxImage } from '@/components/ui/ParallaxImage'
import { ShimmerText } from '@/components/ui/ShimmerText'
import { useLightbox } from '@/contexts/LightboxContext'
import { useReady } from '@/contexts/ReadyContext'
import { WHATSAPP_URL } from '@/lib/data'

const ease = [0.22, 1, 0.36, 1] as const
const HERO_IMAGE = '/images/Portraits/IMG_9777-2.jpeg'

const heroPortrait = [{
  src: HERO_IMAGE,
  alt: 'Portrait — ThePoeticGrapher Studios',
  title: 'ThePoeticGrapher',
  caption: 'Portrait Session · Lagos',
}]

export function Hero() {
  const d = 0.1
  const { open } = useLightbox()
  const ready = useReady()

  return (
    <section
      id="top"
      data-theme="dark"
      className="mobile-hero relative full-height w-full overflow-hidden"
      style={{ backgroundColor: '#080808' }}
      aria-label="Hero — ThePoeticGrapher Studios"
    >
      {/* ── 3D Canvas — desktop only ──────────────────────────────────────── */}
      <div className="hidden md:block absolute inset-0">
        <HeroCanvas ready={ready} />
      </div>

      {/* ── Gradient masks ────────────────────────────────────────────────── */}
      {/* Left: protects text column */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-y-0 left-0 z-[2] pointer-events-none"
        style={{
          width: '58%',
          background: 'linear-gradient(to right, #080808 46%, transparent 100%)',
        }}
      />
      {/* Top: nav fade */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: '16%',
          background: 'linear-gradient(to bottom, #080808 0%, transparent 100%)',
        }}
      />
      {/* Bottom: seamless into next section */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: '20%',
          background: 'linear-gradient(to top, #080808 0%, transparent 100%)',
        }}
      />

      {/* ── Background wordmark ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 overflow-hidden pointer-events-none select-none hidden md:block"
        style={{ zIndex: 1 }}
      >
        <span
          className="font-serif text-white whitespace-nowrap"
          style={{
            fontSize: 'clamp(100px, 14vw, 180px)',
            fontWeight: 400,
            opacity: 0.022,
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            display: 'block',
            transform: 'translateY(22%)',
          }}
        >
          THEPOETICGRAPHER
        </span>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col min-h-[100dvh]">

        {/* Padded zone: label + headline + CTAs */}
        <div className="flex flex-1 flex-col px-6 pb-7 pt-24 md:pb-0 md:pl-16 md:pr-8 md:pt-0">

          {/* Label — top */}
          <motion.div
            className="md:mt-[max(7rem,11vh)]"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: d, duration: 0.6 }}
          >
            <ShimmerText
              text="Light. Camera. Poetry."
              className="font-sans uppercase block tracking-[0.22em] text-[11px] font-semibold"
            />
          </motion.div>

          {/* Headline block — vertically centred */}
          <div className="flex-1 flex flex-col justify-center">

            {/* Main headline */}
            <h1
              className="mobile-hero-title font-serif text-white mb-6 md:mb-7"
              aria-label="Framing Poetry, One Moment at a Time."
            >
              {/* Line 1: FILLED — "Framing Poetry," */}
              <span className="block overflow-hidden text-hero-xl">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={ready ? { y: '0%' } : {}}
                  transition={{ delay: d + 0.32, duration: 0.95, ease }}
                >
                  Framing Poetry,
                </motion.span>
              </span>

              {/* Animated gold divider */}
              <motion.div
                aria-hidden="true"
                className="block my-4 md:my-5 origin-left"
                style={{ height: 1, backgroundColor: 'rgba(200,175,120,0.45)', width: '100%' }}
                initial={{ scaleX: 0 }}
                animate={ready ? { scaleX: 1 } : {}}
                transition={{ delay: d + 0.88, duration: 0.9, ease }}
              />

              {/* Line 2: OUTLINE — "One Moment" */}
              <span className="block overflow-hidden text-hero-xl text-outline-white">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={ready ? { y: '0%' } : {}}
                  transition={{ delay: d + 0.56, duration: 0.95, ease }}
                >
                  One Moment
                </motion.span>
              </span>

              {/* Line 3: FILLED smaller — "at a Time." */}
              <span
                className="block overflow-hidden"
                style={{ fontSize: 'clamp(2rem, 5.5vw, 6rem)', lineHeight: 0.92 }}
              >
                <motion.span
                  className="block text-white/80"
                  initial={{ y: '110%' }}
                  animate={ready ? { y: '0%' } : {}}
                  transition={{ delay: d + 0.74, duration: 0.95, ease }}
                >
                  at a Time.
                </motion.span>
              </span>
            </h1>

            {/* Body + stat row */}
            <motion.div
              className="mobile-hero-copy mb-7 flex items-end gap-8 md:mb-8"
              initial={{ opacity: 0, y: 18 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: d + 1.2, duration: 0.8, ease }}
            >
              <p
                className="max-w-[320px] font-sans text-white/60 md:max-w-[280px]"
                style={{ fontSize: 15, lineHeight: 1.7 }}
              >
                A minimal photography studio capturing portraits, milestones, events, and stories — with emotion, light, and intention.
              </p>

              {/* Stat: 200+ clients */}
              <div className="hidden sm:flex flex-col items-end flex-shrink-0 border-r border-white/12 pr-6">
                <span className="font-serif text-white" style={{ fontSize: 34, fontWeight: 400, lineHeight: 1 }}>
                  {ready && <CountUp target={200} suffix="+" duration={1500} />}
                </span>
                <span
                  className="font-sans text-white/30 uppercase mt-1"
                  style={{ fontSize: 9, letterSpacing: '0.2em' }}
                >
                  happy clients
                </span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mobile-hero-actions flex flex-col gap-3 sm:flex-row"
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
                className="w-full sm:w-auto"
              >
                Book a Session
              </Button>
              <Button as="a" variant="hero-ghost" href="#stories" className="w-full sm:w-auto">
                View Stories
              </Button>
            </motion.div>

          </div>{/* end headline block */}
        </div>{/* end padded zone */}

        {/* Marquee — full-width, no side padding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: d + 2.3, duration: 1 }}
        >
          <MarqueeStrip />
        </motion.div>

      </div>{/* end main content */}

      {/* ── Floating camera metadata (desktop) ───────────────────────────── */}
      <motion.div
        className="absolute right-8 md:right-14 bottom-28 z-20 hidden md:flex flex-col items-end gap-0.5"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: d + 2.6, duration: 0.8 }}
        aria-hidden="true"
      >
        <span
          className="font-sans text-white/15 uppercase tracking-[0.25em]"
          style={{ fontSize: 8 }}
        >
          camera data
        </span>
        <span
          className="font-sans text-white/30 tracking-[0.1em]"
          style={{ fontSize: 11 }}
        >
          f/1.4&nbsp;&nbsp;·&nbsp;&nbsp;35mm&nbsp;&nbsp;·&nbsp;&nbsp;Lagos, NG
        </span>
        <div className="w-10 h-px bg-white/15 mt-1.5" />
      </motion.div>

      {/* ── Click zone over canvas (desktop) ─────────────────────────────── */}
      {ready && (
        <motion.button
          type="button"
          className="hidden md:block cursor-pointer absolute right-0 top-0 bottom-16 w-[42%] z-10"
          onClick={() => open(heroPortrait)}
          aria-label="View portrait — click to expand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: d + 2.2, duration: 0.5 }}
        />
      )}

      {/* ── Mobile background image ───────────────────────────────────────── */}
      <div
        className="md:hidden absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        <ParallaxImage
          src={HERO_IMAGE}
          alt="Portrait"
          speed={0}
          priority
          className="absolute inset-0"
          sizes="130vw"
          objectPosition="55% 36%"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(8,8,8,0.50)' }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(8,8,8,0.84) 0%, rgba(8,8,8,0.30) 38%, rgba(8,8,8,0.92) 100%), linear-gradient(to right, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.28) 58%, transparent 100%)',
          }}
        />
        <div className="mobile-hero-cinema absolute inset-0">
          <span className="mobile-hero-aperture" />
          <span className="mobile-hero-focus mobile-hero-focus-top" />
          <span className="mobile-hero-focus mobile-hero-focus-bottom" />
          <span className="mobile-hero-sweep" />
          <span className="mobile-hero-flare" />
        </div>
      </div>

    </section>
  )
}
