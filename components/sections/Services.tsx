'use client'

import { useRef } from 'react'

import { motion, useInView, useReducedMotion } from 'motion/react'

import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { WHATSAPP_URL, services } from '@/lib/data'
import type { ServiceItem } from '@/types'

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

function ServiceRow({ service, index }: { service: ServiceItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="group relative flex items-center gap-6 md:gap-14 py-9 md:py-11 border-b border-border"
      initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated gold left bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
        style={{ backgroundColor: 'rgba(200,175,120,0.75)' }}
        aria-hidden="true"
      />

      {/* Large faint number — editorial anchor */}
      <div
        className="flex-shrink-0 w-14 md:w-20 xl:w-28 select-none"
        aria-hidden="true"
      >
        <span
          className="font-serif text-ink block transition-opacity duration-300 group-hover:opacity-[0.18]"
          style={{
            fontSize: 'clamp(3rem, 5vw, 5.5rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            opacity: 0.08,
          }}
        >
          {service.number}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-serif text-ink mb-2.5"
          style={{
            fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {service.title}
        </h3>
        <p
          className="font-sans text-muted"
          style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 500 }}
        >
          {service.description}
        </p>
      </div>

      {/* Right: icon + book link */}
      <div className="flex-shrink-0 flex flex-col items-end gap-3">
        <service.Icon
          size={20}
          strokeWidth={1.3}
          className="text-muted group-hover:text-ink transition-colors duration-300"
          aria-hidden="true"
        />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-muted hover:text-ink transition-colors duration-300 hidden sm:block"
          style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          aria-label={`Book a ${service.title} session`}
        >
          Book →
        </a>
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section
      // eslint-disable-next-line react/no-static-id -- navigation anchor, must be a predictable hash target
      id="services"
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
      aria-labelledby="services-heading"
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
            opacity: 0.025,
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          02
        </span>
      </div>

      <div className="relative z-10 max-w-container mx-auto px-6 md:px-8">

        {/* Header: heading left, descriptor right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end mb-16 md:mb-20">
          <div>
            <Reveal>
              <SectionLabel text="Services" />
            </Reveal>
            <GoldAccent />
            <AnimatedHeading
              // eslint-disable-next-line react/no-static-id -- aria-labelledby reference, must be predictable
              id="services-heading"
              as="h2"
              className="font-serif text-ink text-section"
              style={{ lineHeight: 1.04, letterSpacing: '-0.02em' }}
            >
              Photography, Made Personal.
            </AnimatedHeading>
          </div>

          <Reveal delay={0.15}>
            <p
              className="font-sans text-muted lg:max-w-[260px] lg:pb-1"
              style={{ fontSize: 15, lineHeight: 1.8 }}
            >
              Every session is built around you — your story, your moment, your meaning.
            </p>
          </Reveal>
        </div>

        {/* Service list */}
        <div>
          <div className="border-t border-border" />
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.2} className="mt-14">
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
    </section>
  )
}
