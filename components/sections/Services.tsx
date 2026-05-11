'use client'

import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { staggerContainer, cardReveal } from '@/lib/animations'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { WHATSAPP_URL, services } from '@/lib/data'
import type { ServiceItem } from '@/types'

function ServiceCard({ service }: { service: ServiceItem }) {
  const shouldReduce = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spring = { stiffness: 200, damping: 22, mass: 0.5 }
  const rotX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), spring)
  const rotY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), spring)

  return (
    <motion.div
      variants={cardReveal}
      className="bg-surface p-8 flex flex-col group cursor-default"
      style={{
        border: '1px solid var(--border)',
        transition: 'border-color 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s',
        perspective: 600,
        rotateX: shouldReduce ? undefined : rotX,
        rotateY: shouldReduce ? undefined : rotY,
      }}
      whileHover={shouldReduce ? undefined : {
        y: -4,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      onMouseMove={shouldReduce ? undefined : (e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        rawX.set((e.clientX - rect.left) / rect.width - 0.5)
        rawY.set((e.clientY - rect.top) / rect.height - 0.5)
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--charcoal)'
        el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border)'
        el.style.boxShadow = 'none'
        if (!shouldReduce) { rawX.set(0); rawY.set(0) }
      }}
    >
      <div className="flex justify-between items-start mb-6">
        <service.Icon
          size={20}
          strokeWidth={1.5}
          className="text-ink"
          aria-hidden="true"
        />
        <span
          className="font-sans text-muted uppercase"
          style={{ fontSize: 11, letterSpacing: '0.2em' }}
        >
          {service.number}
        </span>
      </div>

      <h3
        className="font-serif text-ink mb-3"
        style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.2 }}
      >
        {service.title}
      </h3>

      <p
        className="font-sans text-muted flex-1"
        style={{ fontSize: 15, lineHeight: 1.7 }}
      >
        {service.description}
      </p>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 font-sans text-muted hover:text-ink transition-colors duration-300"
        style={{ fontSize: 12, letterSpacing: '0.1em' }}
        aria-label={`Book a ${service.title} session`}
      >
        — Book this session
      </a>
    </motion.div>
  )
}

export function Services() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="services"
      className="section-pad"
      style={{ backgroundColor: '#FFFFFF' }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-container mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <Reveal>
              <SectionLabel text="Services" className="mb-6" />
            </Reveal>
            <AnimatedHeading
              id="services-heading"
              as="h2"
              className="font-serif text-ink text-section"
              style={{ lineHeight: 1.04, letterSpacing: '-0.02em' }}
            >
              Photography, Made Personal.
            </AnimatedHeading>
          </div>
          <Reveal delay={0.1}>
            <p
              className="font-sans text-muted self-end md:pt-8"
              style={{ fontSize: 16, lineHeight: 1.75 }}
            >
              Every session is built around you — your story, your moment, your meaning. We work across four areas of photography, all with the same intention.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border"
          variants={staggerContainer(0.08, 0.1)}
          initial={shouldReduce ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* CTA */}
        <Reveal delay={0.2} className="mt-12 flex justify-center">
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
