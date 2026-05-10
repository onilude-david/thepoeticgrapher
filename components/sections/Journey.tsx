'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Reveal } from '@/components/ui/Reveal'
import { journeySteps } from '@/lib/data'

export function Journey() {
  const lineRef = useRef<HTMLDivElement>(null)
  const isLineInView = useInView(lineRef, { once: true, amount: 0.4 })

  return (
    <section
      id="journey"
      className="section-pad"
      style={{ backgroundColor: '#FFFFFF' }}
      aria-labelledby="journey-heading"
    >
      <div className="max-w-container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-16 md:mb-20">
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

            {/* Step dots */}
            <div className="grid grid-cols-4">
              {journeySteps.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.08}>
                  <div className="flex flex-col items-start">
                    {/* Circle */}
                    <div
                      className="w-10 h-10 rounded-full border border-charcoal flex items-center justify-center mb-6 bg-white z-10 relative"
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
                      className="font-serif text-ink mb-3 pr-8"
                      style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.2 }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="font-sans text-muted pr-8"
                      style={{ fontSize: 15, lineHeight: 1.7 }}
                    >
                      {step.description}
                    </p>
                  </div>
                </Reveal>
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

            <div className="space-y-10">
              {journeySteps.map((step, i) => (
                <Reveal key={step.number} delay={i * 0.08} className="relative pl-14">
                  {/* Circle */}
                  <div
                    className="absolute left-0 top-0 w-10 h-10 rounded-full border border-charcoal flex items-center justify-center bg-white z-10"
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
