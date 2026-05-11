'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Reveal } from '@/components/ui/Reveal'
import { journeySteps } from '@/lib/data'
import { Bg3D } from '@/components/ui/Bg3D'

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const isLineInView = useInView(lineRef, { once: true, amount: 0.4 })

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from('.journey-step', {
        rotateX: 40,
        y: 60,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: 'power3.out',
        transformPerspective: 800,
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: '.journey-steps',
          start: 'top 78%',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="section-pad relative"
      style={{ backgroundColor: '#FFFFFF' }}
      aria-labelledby="journey-heading"
    >
      <Bg3D variant="light" />
      <div className="max-w-container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-16 grid gap-8 md:mb-20 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <Reveal>
              <SectionLabel text="The Journey" className="mb-6" />
            </Reveal>
            <AnimatedHeading
              id="journey-heading"
              as="h2"
              className="font-serif text-ink"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
              }}
            >
              Four Steps to Your Story.
            </AnimatedHeading>
          </div>
          <Reveal delay={0.12}>
            <p
              className="max-w-[300px] font-sans text-muted"
              style={{ fontSize: 15, lineHeight: 1.75 }}
            >
              A calm path from first message to final gallery, built so you always know what comes next.
            </p>
          </Reveal>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          {/* Connector line */}
          <div ref={lineRef} className="relative mb-12">
            <div className="absolute top-5 left-0 right-0 h-[1px] bg-border" aria-hidden="true" />
            <motion.div
              className="absolute top-5 left-0 h-[1px] bg-charcoal origin-left"
              style={{ right: 0 }}
              initial={{ scaleX: 0 }}
              animate={isLineInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />

            {/* Step dots — GSAP 3D flip-in via .journey-step */}
            <div className="journey-steps grid grid-cols-4">
              {journeySteps.map((step, i) => (
                <div key={step.number} className="journey-step group flex flex-col items-start pr-6">
                  {/* Circle */}
                  <div
                    className="relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-charcoal bg-white transition-colors duration-300 group-hover:border-[#c8af78] group-hover:bg-[#FAF9F6]"
                  >
                    <span
                      className="font-serif text-ink"
                      style={{ fontSize: 16, fontWeight: 400 }}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <span
                    className="font-sans text-muted/60 uppercase mb-3 block"
                    style={{ fontSize: 10, letterSpacing: '0.2em' }}
                  >
                    {step.number}
                  </span>

                  <h3
                    className="mb-3 font-serif text-ink"
                    style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.2 }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="font-sans text-muted"
                    style={{ fontSize: 15, lineHeight: 1.7 }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-[1px] bg-border"
              aria-hidden="true"
            />

            <div className="space-y-5">
              {journeySteps.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.08} className="relative border border-border bg-white/60 p-5 pl-16">
                  {/* Circle */}
                  <div
                    className="absolute left-4 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-charcoal bg-white"
                  >
                    <span
                      className="font-serif text-ink"
                      style={{ fontSize: 16, fontWeight: 400 }}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <h3
                    className="font-serif text-ink mb-2"
                    style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.2 }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-sans text-muted"
                    style={{ fontSize: 15, lineHeight: 1.7 }}
                  >
                    {step.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
