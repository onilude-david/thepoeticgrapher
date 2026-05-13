'use client'

import { Check, Clock3, Sparkles } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useMemo, useRef, useState } from 'react'

import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getPackageWhatsAppUrl, packageAddOns, packages } from '@/lib/data'
import type { PackageItem } from '@/types'

const ease = [0.22, 1, 0.36, 1] as const

function PackageInquiry({
  selectedPackage,
  onPackageChange,
}: {
  selectedPackage: string
  onPackageChange: (packageName: string) => void
}) {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [moment, setMoment] = useState('')

  const whatsappUrl = useMemo(
    () => getPackageWhatsAppUrl(selectedPackage, { name, date, location, moment }),
    [date, location, moment, name, selectedPackage]
  )

  const inputClass =
    'w-full border border-border bg-white px-4 py-3 font-sans text-ink outline-none transition-colors duration-300 placeholder:text-soft-muted focus:border-[#c8af78]'

  return (
    <Reveal delay={0.14} className="mt-8">
      <div
        id="package-inquiry"
        className="scroll-mt-28 grid gap-6 border border-border bg-white p-5 md:grid-cols-[0.85fr_1.15fr] md:p-7"
      >
        <div>
          <p
            className="font-sans uppercase text-muted"
            style={{ fontSize: 10, letterSpacing: '0.2em' }}
          >
            Send a complete DM
          </p>
          <h3
            className="mt-3 font-serif text-ink"
            style={{ fontSize: 'clamp(1.55rem, 2.7vw, 2.2rem)', lineHeight: 1.08, fontWeight: 400 }}
          >
            Tell us what you need before WhatsApp opens.
          </h3>
          <p className="mt-4 max-w-sm font-sans text-muted" style={{ fontSize: 14, lineHeight: 1.75 }}>
            Pick a package and add the basics. The message will be prepared for you automatically.
          </p>
        </div>

        <div className="grid gap-3">
          <label className="block">
            <span className="mb-2 block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              Package
            </span>
            <select
              value={selectedPackage}
              onChange={(event) => onPackageChange(event.target.value)}
              className={inputClass}
              style={{ fontSize: 14 }}
            >
              {packages.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name} - {item.price}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Name
              </span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={inputClass}
                placeholder="Your name"
                style={{ fontSize: 14 }}
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                Preferred date
              </span>
              <input
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className={inputClass}
                placeholder="e.g. June 15"
                style={{ fontSize: 14 }}
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              Location
            </span>
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className={inputClass}
              placeholder="Where should the session happen?"
              style={{ fontSize: 14 }}
            />
          </label>

          <label className="block">
            <span className="mb-2 block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              Moment
            </span>
            <textarea
              value={moment}
              onChange={(event) => setMoment(event.target.value)}
              className={`${inputClass} min-h-28 resize-none`}
              placeholder="Convocation, birthday, family shoot, group portraits..."
              style={{ fontSize: 14, lineHeight: 1.6 }}
            />
          </label>

          <Button
            as="a"
            variant="primary"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            Send to WhatsApp
          </Button>
        </div>
      </div>
    </Reveal>
  )
}

function PackageCard({
  item,
  index,
  onSelect,
}: {
  item: PackageItem
  index: number
  onSelect: (packageName: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const shouldReduce = useReducedMotion()

  return (
    <motion.article
      ref={ref}
      className={[
        'group relative flex min-h-[27rem] flex-col overflow-hidden border bg-white p-5 transition-colors duration-500 md:p-6',
        item.featured ? 'border-[#c8af78]/70' : 'border-border hover:border-[#c8af78]/45',
      ].join(' ')}
      initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
      animate={isInView || shouldReduce ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.08, ease }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[#c8af78] transition-transform duration-700 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <div
        className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-[#c8af78]/15 transition-transform duration-700 group-hover:scale-110"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(145deg, rgba(200,175,120,0.09), transparent 38%, rgba(17,17,17,0.025))',
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-5">
        <span
          className="font-sans text-muted uppercase"
          style={{ fontSize: 10, letterSpacing: '0.22em' }}
        >
          {item.number}
        </span>
        {item.featured && (
          <span className="inline-flex items-center gap-1.5 border border-[#c8af78]/50 px-2.5 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-ink">
            <Sparkles size={12} strokeWidth={1.5} aria-hidden="true" />
            Popular
          </span>
        )}
      </div>

      <div className="relative mt-10">
        <h3
          className="font-serif text-ink"
          style={{ fontSize: 'clamp(1.75rem, 3vw, 2.45rem)', lineHeight: 1.02, fontWeight: 400 }}
        >
          {item.name}
        </h3>
        {item.subtitle && (
          <p className="mt-4 max-w-[18rem] font-sans text-muted" style={{ fontSize: 14, lineHeight: 1.75 }}>
            {item.subtitle}
          </p>
        )}
      </div>

      <div className="relative mt-8 border-t border-border pt-5">
        <ul className="space-y-3">
          {item.details.map((detail) => (
            <li key={detail} className="flex items-center gap-3 font-sans text-ink" style={{ fontSize: 14 }}>
              <span className="flex h-5 w-5 items-center justify-center border border-[#c8af78]/45 text-[#8f7440]">
                <Check size={12} strokeWidth={1.8} aria-hidden="true" />
              </span>
              {detail}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-auto pt-9">
        <div className="mb-5 flex items-end justify-between gap-4">
          <p className="font-serif text-ink" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 0.9 }}>
            {item.price}
          </p>
          <span
            className="font-sans text-soft-muted uppercase"
            style={{ fontSize: 9, letterSpacing: '0.18em' }}
          >
            Package
          </span>
        </div>
        <Button
          as="button"
          variant={item.featured ? 'primary' : 'ghost'}
          onClick={() => onSelect(item.name)}
          className="w-full"
        >
          Learn More
        </Button>
      </div>
    </motion.article>
  )
}

export function Packages() {
  const [selectedPackage, setSelectedPackage] = useState(packages[0]?.name ?? '')

  function selectPackage(packageName: string) {
    setSelectedPackage(packageName)
    window.requestAnimationFrame(() => {
      document.getElementById('package-inquiry')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      })
    })
  }

  return (
    <section
      id="packages"
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: '#FAF9F6' }}
      aria-labelledby="packages-heading"
    >
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 select-none overflow-hidden leading-none pointer-events-none"
      >
        <span
          className="block font-serif text-ink"
          style={{
            fontSize: 'clamp(120px, 19vw, 250px)',
            lineHeight: 0.72,
            letterSpacing: '-0.05em',
            opacity: 0.035,
          }}
        >
          Packages
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-container px-6 md:px-8">
        <div className="mb-14 grid gap-8 md:mb-18 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <SectionLabel text="How It Works" className="mb-6" />
            </Reveal>
            <AnimatedHeading
              id="packages-heading"
              as="h2"
              className="font-serif text-ink"
              style={{
                fontSize: 'clamp(2.15rem, 4.5vw, 4.4rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.02em',
              }}
            >
              Our Packages.
            </AnimatedHeading>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-[330px] font-sans text-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
              Choose the coverage that fits the memory. Every package is guided, edited, and delivered with care.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((item, index) => (
            <PackageCard key={item.id} item={item} index={index} onSelect={selectPackage} />
          ))}
        </div>

        <PackageInquiry selectedPackage={selectedPackage} onPackageChange={setSelectedPackage} />

        <Reveal delay={0.16} className="mt-8">
          <div className="grid gap-5 border border-border bg-white/72 p-5 md:grid-cols-[auto_1fr] md:gap-7 md:p-7">
            <div className="flex h-12 w-12 items-center justify-center border border-[#c8af78]/45 text-[#8f7440]">
              <Clock3 size={19} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-serif text-ink" style={{ fontSize: 'clamp(1.35rem, 2.3vw, 1.85rem)', lineHeight: 1.15, fontWeight: 400 }}>
                Add ons available at extra cost.
              </h3>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {packageAddOns.map((addOn) => (
                  <div key={addOn.title} className="border-t border-border pt-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <p className="font-sans font-semibold uppercase tracking-[0.14em] text-ink" style={{ fontSize: 10 }}>
                        {addOn.title}
                      </p>
                      {addOn.note && (
                        <span className="bg-ink px-2 py-1 font-sans text-[8px] font-semibold uppercase tracking-[0.14em] text-white">
                          {addOn.note}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-muted" style={{ fontSize: 13, lineHeight: 1.7 }}>
                      {addOn.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
