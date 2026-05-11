'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { Bg3D } from '@/components/ui/Bg3D'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Reveal } from '@/components/ui/Reveal'

const benefits = [
  {
    title: 'Poetic Direction',
    kicker: 'Before the shutter',
    body: 'We guide you through each session with intention — not stiff poses, but genuine moments. You will feel it.',
  },
  {
    title: 'Clean Editing',
    kicker: 'After the frame',
    body: 'No heavy filters, no over-retouching. Real skin, real light, real you — with restraint and taste.',
  },
  {
    title: 'Story-Led Delivery',
    kicker: 'When it arrives',
    body: 'Your photographs arrive as a curated set — a sequence that tells your story, not just a folder of images.',
  },
]

export function WhyTPG() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.why-benefit', {
        rotateX: -24,
        y: 46,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: 'power3.out',
        transformPerspective: 900,
        scrollTrigger: {
          trigger: '.why-benefits',
          start: 'top 80%',
        },
      })

      gsap.from('.why-proof-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.why-proof-line',
          start: 'top 84%',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="why"
      className="section-pad relative"
      style={{ backgroundColor: '#F3F1EC' }}
      aria-labelledby="why-heading"
    >
      <Bg3D variant="light" />
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:divide-x md:divide-warm-line md:gap-0">
          {/* Col 1: heading */}
          <div className="md:pr-12 pb-10 md:pb-0">
            <Reveal>
              <SectionLabel text="Why TPG" className="mb-6" />
            </Reveal>
            <AnimatedHeading
              id="why-heading"
              as="h2"
              className="font-serif text-ink mb-6"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              The difference is in the intention.
            </AnimatedHeading>
            <Reveal delay={0.15}>
              <p
                className="max-w-xl font-sans text-muted"
                style={{ fontSize: 15, lineHeight: 1.75 }}
              >
                We don&rsquo;t just show up with a camera. We arrive with curiosity, patience, and the belief that you deserve photographs that feel true.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 border-y border-warm-line py-5">
                <p
                  className="font-serif text-ink"
                  style={{ fontSize: 'clamp(1.25rem, 2vw, 1.55rem)', lineHeight: 1.35, fontStyle: 'italic' }}
                >
                  We make room for the person before we make the picture.
                </p>
              </div>
            </Reveal>

            {/* Decorative vertical text */}
            <div
              className="hidden md:block mt-16 select-none"
              aria-hidden="true"
            >
              <span
                className="font-sans text-muted/30 uppercase inline-block"
                style={{
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  writingMode: 'vertical-lr',
                  transform: 'rotate(180deg)',
                }}
              >
                Est. 2024 — THEPOETICGRAPHER
              </span>
            </div>
          </div>

          {/* Col 2 & 3: benefits — GSAP 3D fold-in via .why-benefit */}
          <div className="md:col-span-2 md:pl-12">
            <div className="why-benefits grid gap-4">
              {benefits.map((benefit, i) => (
                <article
                  key={benefit.title}
                  className="why-benefit group relative overflow-hidden border border-warm-line bg-[#FAF9F6]/55 p-5 transition-colors duration-300 hover:bg-white/70 md:p-7"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-[#c8af78]/80 transition-transform duration-500 group-hover:scale-y-100"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute right-4 top-3 font-serif text-ink"
                    style={{ fontSize: 'clamp(3.4rem, 6vw, 5.4rem)', lineHeight: 1, opacity: 0.035, letterSpacing: '-0.04em' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="relative z-10 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start">
                    <div className="flex h-12 w-12 items-center justify-center border border-warm-line bg-white/60">
                      <span
                        className="font-serif text-ink"
                        style={{ fontSize: 18, lineHeight: 1, fontWeight: 400 }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p
                        className="mb-2 font-sans uppercase text-muted"
                        style={{ fontSize: 9, letterSpacing: '0.2em', fontWeight: 600 }}
                      >
                        {benefit.kicker}
                      </p>
                      <h3
                        className="mb-3 font-serif text-ink"
                        style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.55rem)', fontWeight: 400, lineHeight: 1.15 }}
                      >
                        {benefit.title}
                      </h3>
                      <p
                        className="font-sans text-muted"
                        style={{ fontSize: 15, lineHeight: 1.75 }}
                      >
                        {benefit.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <div className="why-proof-line h-px bg-warm-line" aria-hidden="true" />
              <div className="grid gap-4 py-5 sm:grid-cols-3">
                {[
                  ['Calm direction', 'No awkward guessing'],
                  ['Natural finishing', 'Skin and light stay honest'],
                  ['Curated delivery', 'A story, not a dump'],
                ].map(([label, detail]) => (
                  <div key={label}>
                    <p
                      className="font-sans uppercase text-ink"
                      style={{ fontSize: 10, letterSpacing: '0.18em', fontWeight: 600 }}
                    >
                      {label}
                    </p>
                    <p
                      className="mt-1 font-sans text-muted"
                      style={{ fontSize: 13, lineHeight: 1.55 }}
                    >
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
              <div className="h-px bg-warm-line" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
