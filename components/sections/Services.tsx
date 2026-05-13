'use client'

import { useRef } from 'react'

import Image from 'next/image'
import { motion, useInView, useReducedMotion } from 'motion/react'

import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { BOOKING_FORM_HREF, services } from '@/lib/data'
import type { ServiceItem } from '@/types'

const serviceMeta: Record<string, { note: string; pace: string }> = {
  convocation: { note: 'Milestone-led', pace: '60-120 min' },
  personal: { note: 'Directed portraits', pace: '1-2 looks' },
  family: { note: 'Connection-first', pace: 'Small groups' },
  events: { note: 'Story coverage', pace: 'Hourly' },
}

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
  const meta = serviceMeta[service.id]

  return (
    <motion.div
      ref={ref}
      className="group relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-5 border-b border-border py-8 md:grid-cols-[auto_minmax(0,0.8fr)_minmax(0,1.4fr)_auto] md:items-center md:gap-8 md:py-11 xl:gap-12"
      initial={shouldReduce ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 34, rotateX: -10 }}
      animate={isInView || shouldReduce ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 900 }}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(90deg, rgba(200,175,120,0.10) 0%, rgba(200,175,120,0.035) 38%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Animated gold left bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
        style={{ backgroundColor: 'rgba(200,175,120,0.75)' }}
        aria-hidden="true"
      />

      {/* Large faint number — editorial anchor */}
      <div
        className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden border border-border bg-white/70 select-none transition-colors duration-300 group-hover:border-[#c8af78]/60 md:h-auto md:w-20 md:border-0 md:bg-transparent xl:w-28"
        aria-hidden="true"
      >
        <span
          className="block font-serif text-ink transition-opacity duration-300 group-hover:opacity-[0.18]"
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
        <service.Icon
          size={18}
          strokeWidth={1.35}
          className="absolute text-ink/55 opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:text-ink md:hidden"
        />
      </div>

      {/* Service image */}
      <div className="relative order-3 col-span-2 overflow-hidden bg-ink md:order-none md:col-span-1 md:h-36 xl:h-40">
        <div className="relative aspect-[16/10] md:h-full md:aspect-auto">
          <Image
            src={service.image}
            alt={`${service.title} sample photograph`}
            fill
            className="object-cover img-bw transition-all duration-700 group-hover:scale-[1.045] group-hover:filter-none"
            sizes="(max-width: 768px) 100vw, 24vw"
            style={{ objectPosition: service.objectPosition ?? '50% 16%' }}
          />
          <div
            className="absolute inset-0 bg-black/35 transition-opacity duration-500 group-hover:opacity-0"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative order-2 min-w-0 md:order-none">
        {meta && (
          <div className="mb-3 flex flex-wrap gap-2">
            {[meta.note, meta.pace].map((item) => (
              <span
                key={item}
                className="border border-border px-2.5 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.16em] text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        )}
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
      <div className="relative order-4 col-span-2 flex items-center justify-between border-t border-border pt-4 md:order-none md:col-span-1 md:flex-shrink-0 md:flex-col md:items-end md:justify-start md:gap-3 md:border-t-0 md:pt-0">
        <service.Icon
          size={20}
          strokeWidth={1.3}
          className="hidden text-muted transition-colors duration-300 group-hover:text-ink md:block"
          aria-hidden="true"
        />
        <a
          href={BOOKING_FORM_HREF}
          className="font-sans text-muted transition-colors duration-300 hover:text-ink"
          style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          aria-label={`Book a ${service.title} session`}
        >
          Book →
        </a>
        <span
          className="font-sans text-soft-muted uppercase md:hidden"
          style={{ fontSize: 9, letterSpacing: '0.18em' }}
        >
          {String(index + 1).padStart(2, '0')} / {services.length.toString().padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section
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

      <div
        aria-hidden="true"
        className="absolute left-0 top-[38%] h-px w-full bg-gradient-to-r from-transparent via-[#c8af78]/20 to-transparent"
        style={{ zIndex: 0 }}
      />

      <div className="relative z-10 max-w-container mx-auto px-6 md:px-8">

        {/* Header: heading left, descriptor right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end mb-16 md:mb-20">
          <div>
            <Reveal>
              <SectionLabel text="Services" />
            </Reveal>
            <GoldAccent />
            <AnimatedHeading
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
          <div className="grid gap-5 border border-border bg-background/70 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7">
            <div>
              <p
                className="font-serif text-ink"
                style={{ fontSize: 'clamp(1.35rem, 2.4vw, 1.8rem)', lineHeight: 1.2, fontWeight: 400 }}
              >
                Not sure which session fits?
              </p>
              <p
                className="mt-2 max-w-xl font-sans text-muted"
                style={{ fontSize: 14, lineHeight: 1.7 }}
              >
                Send the moment, date, and location. We&rsquo;ll help shape the right coverage.
              </p>
            </div>
            <Button
              as="a"
              variant="primary"
              href={BOOKING_FORM_HREF}
              className="w-full md:w-auto"
            >
              Book Your Session
            </Button>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
