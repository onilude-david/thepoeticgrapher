'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { ImageCard } from '@/components/ui/ImageCard'
import { Reveal } from '@/components/ui/Reveal'
import { portfolioItems } from '@/lib/data'
import type { PortfolioItem } from '@/types'

// Standalone fill-based card for the horizontal scroll track
function PortfolioCard({ item }: { item: PortfolioItem }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <div
      ref={ref}
      className="portfolio-card relative flex-shrink-0 overflow-hidden group"
      style={{
        width: 'min(62vw, 680px)',
        height: 'min(82vh, 740px)',
        marginRight: 16,
      }}
    >
      {/* Clip-path image reveal */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Scale-in on reveal */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={item.image}
            alt={`${item.title} — ${item.caption}`}
            fill
            className="object-cover img-bw transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ objectPosition: 'top' }}
            sizes="(max-width: 1024px) 85vw, 62vw"
          />
        </motion.div>
      </motion.div>

      {/* Bottom overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }}
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="font-serif text-white" style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.2 }}>
              {item.title}
            </p>
            <p className="font-sans text-soft-muted uppercase mt-1" style={{ fontSize: 10, letterSpacing: '0.2em' }}>
              {item.caption}
            </p>
          </div>
          <ArrowRight size={14} strokeWidth={1.5} className="text-white mb-0.5" />
        </div>
      </div>
    </div>
  )
}

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        if (!sectionRef.current || !trackRef.current) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const section = sectionRef.current
        const track = trackRef.current

        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
            onUpdate: () => {
              const cards = track.querySelectorAll<HTMLElement>('.portfolio-card')
              const vw = window.innerWidth
              cards.forEach((card) => {
                const rect = card.getBoundingClientRect()
                const cardCenter = rect.left + rect.width / 2
                const offset = (cardCenter - vw * 0.5) / (vw * 0.65)
                const ry = gsap.utils.clamp(-18, 18, offset * 22)
                card.style.transform = `perspective(1100px) rotateY(${ry}deg)`
              })
            },
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
      className="relative overflow-hidden"
      style={{ backgroundColor: '#FAF9F6' }}
      aria-labelledby="portfolio-heading"
    >
      {/* Header */}
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
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.04, letterSpacing: '-0.02em' }}
            >
              Moments We&rsquo;ve Kept.
            </AnimatedHeading>
          </div>
          <Reveal delay={0.1} className="flex-shrink-0">
            <p className="font-sans text-muted max-w-xs" style={{ fontSize: 15, lineHeight: 1.75 }}>
              A selection of work. Each image made with someone who trusted us to get it right.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Desktop: GSAP horizontal scroll track */}
      <div
        ref={trackRef}
        className="hidden lg:flex px-6 pb-16"
        style={{ gap: 0 }}
      >
        {portfolioItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
        {/* End spacer */}
        <div className="flex-shrink-0 w-16" aria-hidden="true" />
      </div>

      {/* Mobile: 2-column grid */}
      <div className="lg:hidden grid grid-cols-2 gap-3 px-6 md:px-8 pb-16">
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
