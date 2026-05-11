'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Reveal } from '@/components/ui/Reveal'

const benefits = [
  {
    title: 'Poetic Direction',
    body: 'We guide you through each session with intention — not stiff poses, but genuine moments. You will feel it.',
  },
  {
    title: 'Clean Editing',
    body: 'No heavy filters, no over-retouching. Real skin, real light, real you — with restraint and taste.',
  },
  {
    title: 'Story-Led Delivery',
    body: 'Your photographs arrive as a curated set — a sequence that tells your story, not just a folder of images.',
  },
]

export function WhyTPG() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.why-benefit', {
        rotateX: -30,
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        transformPerspective: 700,
        scrollTrigger: {
          trigger: '.why-benefits',
          start: 'top 80%',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="why"
      className="section-pad"
      style={{ backgroundColor: '#F3F1EC' }}
      aria-labelledby="why-heading"
    >
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-warm-line gap-0">
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
                className="font-sans text-muted"
                style={{ fontSize: 15, lineHeight: 1.75 }}
              >
                We don&rsquo;t just show up with a camera. We arrive with curiosity, patience, and the belief that you deserve photographs that feel true.
              </p>
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
            <div className="why-benefits divide-y divide-warm-line">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="why-benefit py-8 first:pt-0 md:first:pt-0 last:pb-0">
                  <h3
                    className="font-serif text-ink mb-3"
                    style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.2 }}
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
