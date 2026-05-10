'use client'

import { useRef, useLayoutEffect } from 'react'
import { motion } from 'motion/react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { ImageCard } from '@/components/ui/ImageCard'
import { Reveal } from '@/components/ui/Reveal'
import { portfolioItems } from '@/lib/data'

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        if (!sectionRef.current || !trackRef.current) return

        const cards = gsap.utils.toArray<HTMLElement>('.portfolio-card')
        if (cards.length === 0) return

        gsap.to(cards, {
          xPercent: -100 * (cards.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${trackRef.current!.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="stories"
      className="portfolio-section relative"
      style={{ backgroundColor: '#FAF9F6' }}
      aria-labelledby="portfolio-heading"
    >
      {/* Header row — visible above the horizontal scroll track */}
      <div className="max-w-container mx-auto px-6 md:px-8 pt-16 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Reveal>
              <SectionLabel text="Our Stories" className="mb-6" />
            </Reveal>
            <AnimatedHeading
              id="portfolio-heading"
              as="h2"
              className="font-serif text-ink"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
              }}
            >
              Moments We&rsquo;ve Kept.
            </AnimatedHeading>
          </div>
          <Reveal delay={0.1} className="flex-shrink-0">
            <p
              className="font-sans text-muted max-w-xs"
              style={{ fontSize: 15, lineHeight: 1.75 }}
            >
              A selection of work. Each image made with someone who trusted us to get it right.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="portfolio-track flex overflow-x-auto md:overflow-visible"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
      >
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="portfolio-card flex-shrink-0"
            style={{
              width: 'min(60vw, 680px)',
              height: 'min(85vh, 760px)',
              scrollSnapAlign: 'start',
              paddingRight: 16,
            }}
          >
            <div className="relative w-full h-full group overflow-hidden">
              <ImageCard
                src={item.image}
                alt={`${item.title} — ${item.caption}`}
                title={item.title}
                caption={item.caption}
                showArrow
                aspectRatio="auto"
                className="absolute inset-0 h-full"
              />
            </div>
          </div>
        ))}
        {/* End spacer */}
        <div className="flex-shrink-0 w-16 hidden md:block" aria-hidden="true" />
      </div>

      {/* Mobile: simple grid fallback (visible only on mobile since desktop uses horizontal scroll) */}
      <div
        className="lg:hidden grid grid-cols-2 gap-3 px-6 md:px-8 pb-16 mt-8"
      >
        {portfolioItems.map((item) => (
          <ImageCard
            key={`mobile-${item.id}`}
            src={item.image}
            alt={`${item.title} — ${item.caption}`}
            title={item.title}
            caption={item.caption}
            showArrow
            aspectRatio="3/4"
          />
        ))}
      </div>
    </section>
  )
}
