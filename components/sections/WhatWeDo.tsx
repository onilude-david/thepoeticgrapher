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
import { WHATSAPP_URL } from '@/lib/data'

const gridImages = [
  {
    src: '/images/Graduation%20Portrait/_Q7A9135-.jpg',
    alt: 'Convocation portrait — a graduate in academic regalia, framed with quiet pride',
    title: 'The Ceremony',
    caption: 'Convocation Portrait',
  },
  {
    src: '/images/Portraits/IMG_9787-2.jpeg',
    alt: 'Personal portrait session — soft natural light on a subject at ease',
    title: 'Solitude',
    caption: 'Personal Session',
  },
  {
    src: '/images/Portraits/IMG_9793-2.jpeg',
    alt: 'Portrait session — an honest, unhurried moment between subject and light',
    title: 'Still',
    caption: 'Portrait Session',
  },
  {
    src: '/images/events/IMG_0368.jpeg',
    alt: 'Event documentation — guests gathered in celebration, a moment preserved',
    title: 'The Gathering',
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

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-12 lg:gap-20 items-center">

          {/* ── Left: Content ─────────────────────────────────────────── */}
          <div>
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
                className="font-serif text-ink my-8 pl-5"
                style={{
                  borderLeft: '2px solid rgba(200,175,120,0.6)',
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
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Your Session
              </Button>
            </Reveal>
          </div>

          {/* ── Right: Masonry image grid ──────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 items-start">

            {/* Column 1: images 0 and 2 */}
            <div className="flex flex-col gap-3 md:gap-4">
              <Tilt3D intensity={6}>
                <ImageCard
                  src={gridImages[0].src}
                  alt={gridImages[0].alt}
                  title={gridImages[0].title}
                  caption={gridImages[0].caption}
                  aspectRatio="3/4"
                  showArrow
                  onClick={() => open(gridImages, 0)}
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
                  onClick={() => open(gridImages, 2)}
                />
              </Tilt3D>
            </div>

            {/* Column 2: images 1 and 3 — offset downward for masonry rhythm */}
            <div className="flex flex-col gap-3 md:gap-4 mt-12 md:mt-16">
              <Tilt3D intensity={6}>
                <ImageCard
                  src={gridImages[1].src}
                  alt={gridImages[1].alt}
                  title={gridImages[1].title}
                  caption={gridImages[1].caption}
                  aspectRatio="4/5"
                  showArrow
                  onClick={() => open(gridImages, 1)}
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
                  onClick={() => open(gridImages, 3)}
                />
              </Tilt3D>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
