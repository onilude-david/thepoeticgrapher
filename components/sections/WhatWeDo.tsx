'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Button } from '@/components/ui/Button'
import { ImageCard } from '@/components/ui/ImageCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Tilt3D } from '@/components/ui/Tilt3D'
import { useLightbox } from '@/contexts/LightboxContext'
import { BOOKING_FORM_HREF } from '@/lib/data'

const ease = [0.22, 1, 0.36, 1] as const

const gridImages = [
  {
    src: '/images/events/IMG_9413.jpeg',
    alt: 'Editorial portrait — a composed studio frame with soft presence',
    title: 'Still Grace',
    caption: 'Portrait Session',
  },
  {
    src: '/images/Portraits/IMG_9848.jpeg',
    alt: 'Personal portrait — a calm image held with careful light',
    title: 'Soft Resolve',
    caption: 'Personal Portrait',
  },
  {
    src: '/images/Portraits/IMG_9903.jpeg',
    alt: 'Portrait story — a person framed with warmth and intention',
    title: 'Near Light',
    caption: 'Story Portrait',
  },
  {
    src: '/images/events/IMG_0417.jpeg',
    alt: 'Event documentation — a celebration moment captured with atmosphere',
    title: 'Gathered',
    caption: 'Event Documentation',
  },
]

const STATS = [
  { value: '4+', label: 'Years' },
  { value: '200+', label: 'Sessions' },
  { value: 'Lagos', label: 'Studio' },
]

function GoldAccent() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      ref={ref}
      className="h-px origin-left mb-7"
      style={{ width: 44, backgroundColor: 'rgba(200,175,120,0.65)' }}
      initial={shouldReduce ? { scaleX: 1 } : { scaleX: 0 }}
      animate={isInView || shouldReduce ? { scaleX: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    />
  )
}

function MobileStats() {
  return (
    <Reveal delay={0.08}>
      <div className="mb-12 grid grid-cols-3 divide-x divide-border border-y border-border py-4 md:hidden">
        {STATS.map(({ value, label }) => (
          <div key={label} className="px-3 text-center">
            <span
              className="block font-serif text-ink"
              style={{ fontSize: 22, fontWeight: 400, lineHeight: 1 }}
            >
              {value}
            </span>
            <span
              className="mt-1 block font-sans uppercase text-muted"
              style={{ fontSize: 8, letterSpacing: '0.18em' }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  )
}

function ImageCluster({ onOpen }: { onOpen: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.22 })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={shouldReduce ? false : { opacity: 0, y: 44, rotateX: 10 }}
      animate={isInView || shouldReduce ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.9, ease }}
      style={{ transformPerspective: 1000 }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute -left-4 top-8 hidden h-28 w-28 rounded-full border border-[#c8af78]/25 md:block"
        initial={shouldReduce ? false : { opacity: 0, scale: 0.7, rotate: -20 }}
        animate={isInView || shouldReduce ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ delay: 0.18, duration: 0.9, ease }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-7 bottom-16 hidden h-40 w-40 rounded-full border border-ink/10 md:block"
        initial={shouldReduce ? false : { opacity: 0, scale: 0.85, rotate: 18 }}
        animate={isInView || shouldReduce ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ delay: 0.26, duration: 1, ease }}
      />

      <div className="grid grid-cols-1 gap-3 min-[460px]:grid-cols-2 md:gap-4">
        <motion.div
          className="flex flex-col gap-3 md:gap-4"
          initial={shouldReduce ? false : { y: 26 }}
          animate={isInView || shouldReduce ? { y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.85, ease }}
        >
          <Tilt3D intensity={6}>
            <ImageCard
              src={gridImages[0].src}
              alt={gridImages[0].alt}
              title={gridImages[0].title}
              caption={gridImages[0].caption}
              aspectRatio="3/4"
              showArrow
              onClick={() => onOpen(0)}
            />
          </Tilt3D>
          <Tilt3D intensity={6}>
            <ImageCard
              src={gridImages[2].src}
              alt={gridImages[2].alt}
              title={gridImages[2].title}
              caption={gridImages[2].caption}
              aspectRatio="4/5"
              showArrow
              onClick={() => onOpen(2)}
            />
          </Tilt3D>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3 min-[460px]:mt-12 md:mt-16 md:gap-4"
          initial={shouldReduce ? false : { y: -18 }}
          animate={isInView || shouldReduce ? { y: 0 } : {}}
          transition={{ delay: 0.16, duration: 0.85, ease }}
        >
          <Tilt3D intensity={6}>
            <ImageCard
              src={gridImages[1].src}
              alt={gridImages[1].alt}
              title={gridImages[1].title}
              caption={gridImages[1].caption}
              aspectRatio="4/5"
              showArrow
              onClick={() => onOpen(1)}
            />
          </Tilt3D>
          <Tilt3D intensity={6}>
            <ImageCard
              src={gridImages[3].src}
              alt={gridImages[3].alt}
              title={gridImages[3].title}
              caption={gridImages[3].caption}
              aspectRatio="3/4"
              showArrow
              onClick={() => onOpen(3)}
            />
          </Tilt3D>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function WhatWeDo() {
  const { open } = useLightbox()

  return (
    <section
      id="about"
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: '#FAF9F6' }}
      aria-labelledby="about-heading"
    >
      {/* Section number watermark */}
      <div
        aria-hidden="true"
        className="absolute -top-6 right-0 select-none pointer-events-none overflow-hidden leading-none"
        style={{ zIndex: 0 }}
      >
        <span
          className="font-serif text-ink block"
          style={{
            fontSize: 'clamp(160px, 22vw, 300px)',
            fontWeight: 400,
            opacity: 0.03,
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          01
        </span>
      </div>

      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[#c8af78]/20 to-transparent"
        style={{ zIndex: 0 }}
      />

      <div className="relative z-10 max-w-container mx-auto px-6 md:px-8">

        {/* Header row: label + stats */}
        <div className="flex items-end justify-between mb-14 md:mb-20">
          <Reveal>
            <SectionLabel text="What We Do" />
          </Reveal>

          {/* Stats strip */}
          <Reveal delay={0.1}>
            <div className="hidden md:flex items-stretch gap-0 divide-x divide-border">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-end px-7 last:pr-0">
                  <span
                    className="font-serif text-ink"
                    style={{ fontSize: 20, fontWeight: 400, lineHeight: 1 }}
                  >
                    {value}
                  </span>
                  <span
                    className="font-sans text-muted uppercase mt-1"
                    style={{ fontSize: 9, letterSpacing: '0.2em' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <MobileStats />

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">

          {/* ── Left: Content ─────────────────────────────────────────── */}
          <div className="lg:max-w-[460px]">
            <GoldAccent />

            <AnimatedHeading
              id="about-heading"
              as="h2"
              className="font-serif text-ink text-section mb-8"
              style={{ lineHeight: 1.04, letterSpacing: '-0.02em' }}
            >
              We Notice Meaning.
            </AnimatedHeading>

            <Reveal delay={0.1}>
              <div
                className="font-sans text-muted mb-8 space-y-4"
                style={{ fontSize: 15, lineHeight: 1.8 }}
              >
                <p>
                  ThePoeticGrapher Studios is built on one simple belief: every meaningful
                  moment deserves to be remembered with care.
                </p>
                <p>
                  We capture portraits, milestones, events, and personal stories with
                  attention to light, emotion, and detail.
                </p>
              </div>
            </Reveal>

            {/* Pull quote */}
            <Reveal delay={0.2}>
              <blockquote
                className="my-8 border-l-2 border-[#c8af78]/60 pl-5 font-serif text-ink"
                style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  lineHeight: 1.4,
                  fontStyle: 'italic',
                  letterSpacing: '-0.01em',
                }}
              >
                Not just how it looked.
                <br />
                How it felt.
              </blockquote>
            </Reveal>

            <Reveal delay={0.3}>
              <Button
                as="a"
                variant="primary"
                href={BOOKING_FORM_HREF}
                className="w-full sm:w-auto"
              >
                Book Your Session
              </Button>
            </Reveal>
          </div>

          {/* ── Right: Masonry image grid ──────────────────────────────── */}
          <ImageCluster onOpen={(index) => open(gridImages, index)} />
        </div>

      </div>
    </section>
  )
}
