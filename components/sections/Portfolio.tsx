'use client'

import { useRef, useState } from 'react'

import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ArrowRight } from 'lucide-react'
import { motion, useInView, useReducedMotion } from 'motion/react'

import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { ImageCard } from '@/components/ui/ImageCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { gsap } from '@/lib/gsap'
import { useLightbox, type LightboxImage } from '@/contexts/LightboxContext'
import { portfolioItems } from '@/lib/data'
import type { PortfolioItem } from '@/types'

type Category = 'All' | 'Convocation' | 'Portrait' | 'Family' | 'Event'
const CATEGORIES: Category[] = ['All', 'Convocation', 'Portrait', 'Family', 'Event']

const lightboxImages: LightboxImage[] = portfolioItems.map(item => ({
  src: item.image,
  alt: `${item.title} — ${item.caption}`,
  title: item.title,
  caption: item.caption,
}))

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

function PortfolioCard({
  item,
  index,
  total,
  onOpen,
}: {
  item: PortfolioItem
  index: number
  total: number
  onOpen: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <button
      type="button"
      ref={ref as never}
      className="portfolio-card group relative flex-shrink-0 cursor-pointer overflow-visible"
      onClick={onOpen}
      aria-label={`View ${item.title}`}
      style={{
        width: 'min(58vw, 620px)',
        height: 'min(76vh, 700px)',
        marginRight: 42,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity, filter',
      }}
    >
      <div
        aria-hidden="true"
        className="portfolio-card-shadow absolute inset-0 translate-y-8 bg-black/25 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
        style={{ transform: 'translateZ(-70px) translateY(34px) scale(0.9)', opacity: 0.45 }}
      />

      <div
        aria-hidden="true"
        className="absolute -inset-4 border border-[#c8af78]/15 opacity-0 transition-all duration-500 group-hover:-inset-6 group-hover:opacity-100"
        style={{ transform: 'translateZ(28px)' }}
      />

      <div
        className="portfolio-card-inner absolute inset-0 overflow-hidden bg-black"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 28px 80px rgba(0,0,0,0.28)',
        }}
      >
      {/* Image with clip-path + scale reveal */}
      <motion.div
        className="absolute inset-0 portfolio-card-image"
        style={{ transform: 'translateZ(1px)' }}
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
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

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(112deg, transparent 0%, transparent 36%, rgba(255,255,255,0.26) 47%, transparent 58%, transparent 100%)',
          transform: 'translateZ(18px)',
        }}
      />

      <div
        aria-hidden="true"
        className="absolute left-4 top-4 h-8 w-8 border-l border-t border-[#c8af78]/55"
        style={{ transform: 'translateZ(32px)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-[#c8af78]/55"
        style={{ transform: 'translateZ(32px)' }}
      />

      {/* Top: category + frame counter */}
      <div
        className="absolute top-0 left-0 right-0 flex items-start justify-between p-5 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 100%)', transform: 'translateZ(42px)' }}
      >
        <span
          className="font-sans uppercase tracking-[0.22em] text-white/60"
          style={{ fontSize: 9 }}
        >
          {item.category}
        </span>
        <span
          className="font-sans text-white/35 tabular-nums"
          style={{ fontSize: 9, letterSpacing: '0.1em' }}
        >
          {String(index + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom caption */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 58%)', transform: 'translateZ(44px)' }}
      >
        <div className="flex items-end justify-between">
          <div>
            <p
              className="font-serif text-white"
              style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.2 }}
            >
              {item.title}
            </p>
            <p
              className="font-sans text-white/50 uppercase mt-1.5"
              style={{ fontSize: 10, letterSpacing: '0.22em' }}
            >
              {item.caption}
            </p>
          </div>
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="text-white/40 mb-0.5 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300"
          />
        </div>
      </div>
      </div>
    </button>
  )
}

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const { open } = useLightbox()
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [gridRef] = useAutoAnimate<HTMLDivElement>({ duration: 300 })
  const shouldReduce = useReducedMotion()

  const filtered = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory)

  const filteredLightbox = lightboxImages.filter((_, i) =>
    activeCategory === 'All' || portfolioItems[i].category === activeCategory
  )

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
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`
              }
              const cards = track.querySelectorAll<HTMLElement>('.portfolio-card')
              const vw = window.innerWidth
              cards.forEach((card) => {
                const rect = card.getBoundingClientRect()
                const cardCenter = rect.left + rect.width / 2
                const offset = (cardCenter - vw * 0.5) / (vw * 0.52)
                const depth = gsap.utils.clamp(0, 1, 1 - Math.abs(offset))
                const ry = gsap.utils.clamp(-34, 34, offset * 34)
                const rx = gsap.utils.clamp(-7, 7, -Math.abs(offset) * 7 + depth * 2)
                const z = -120 + depth * 240
                const scale = 0.82 + depth * 0.2
                const opacity = 0.42 + depth * 0.58
                const blur = (1 - depth) * 2.5
                card.style.zIndex = String(Math.round(depth * 100))
                card.style.opacity = String(opacity)
                card.style.filter = `blur(${blur}px) saturate(${0.78 + depth * 0.22})`
                card.style.transform = `perspective(1400px) translateZ(${z}px) rotateY(${ry}deg) rotateX(${rx}deg) scale(${scale})`
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 72% 36%, rgba(200,175,120,0.14), transparent 22%), radial-gradient(circle at 22% 70%, rgba(17,17,17,0.08), transparent 24%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-[52%] hidden h-px bg-gradient-to-r from-transparent via-[#c8af78]/35 to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 hidden h-[520px] w-[520px] rounded-full border border-[#c8af78]/15 lg:block"
      />

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
            opacity: 0.03,
            letterSpacing: '-0.05em',
            lineHeight: 1,
          }}
        >
          03
        </span>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-container mx-auto px-6 md:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">

          {/* Left: label + heading */}
          <div>
            <Reveal>
              <SectionLabel text="Our Stories" />
            </Reveal>
            <GoldAccent />
            <AnimatedHeading
              id="portfolio-heading"
              as="h2"
              className="font-serif text-ink text-section"
              style={{ lineHeight: 1.04, letterSpacing: '-0.02em' }}
            >
              Moments We&apos;ve Kept.
            </AnimatedHeading>
          </div>

          {/* Right: descriptor + drag hint (desktop) */}
          <Reveal delay={0.1} className="flex-shrink-0">
            <div className="md:max-w-[280px] space-y-5 md:pb-1">
              <p
                className="font-sans text-muted"
                style={{ fontSize: 15, lineHeight: 1.75 }}
              >
                A selection of work. Each image made with someone who trusted us to get it right.
              </p>
              <motion.div
                className="hidden lg:flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <motion.span
                  aria-hidden="true"
                  animate={shouldReduce ? {} : { x: [0, 5, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight size={11} strokeWidth={1.5} className="text-muted" />
                </motion.span>
                <span
                  className="font-sans text-muted uppercase tracking-[0.2em]"
                  style={{ fontSize: 9 }}
                >
                  Drag to explore
                </span>
              </motion.div>
            </div>
          </Reveal>
        </div>

        {/* Mobile category filters — editorial underline tabs */}
        <div
          className="flex lg:hidden gap-6 mt-8 flex-wrap"
          role="group"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`font-sans uppercase pb-2 border-b text-[10px] tracking-[0.18em] transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-ink'
                  : 'text-muted border-transparent hover:text-ink hover:border-soft-muted'
              }`}
              style={
                activeCategory === cat
                  ? { borderBottomColor: 'rgba(200,175,120,0.75)' }
                  : undefined
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: GSAP horizontal scroll track */}
      <div
        ref={trackRef}
        className="hidden lg:flex px-6 pb-20 pt-8"
        style={{ gap: 0, perspective: '1400px', transformStyle: 'preserve-3d' }}
      >
        {portfolioItems.map((item, i) => (
          <PortfolioCard
            key={item.id}
            item={item}
            index={i}
            total={portfolioItems.length}
            onOpen={() => open(lightboxImages, i)}
          />
        ))}
        <div className="flex-shrink-0 w-16" aria-hidden="true" />
      </div>

      {/* Mobile: 2-column grid with AutoAnimate */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-3 px-6 pb-16 min-[430px]:grid-cols-2 md:px-8 lg:hidden"
      >
        {filtered.map((item, i) => (
          <ImageCard
            key={item.id}
            src={item.image}
            alt={`${item.title} — ${item.caption}`}
            title={item.title}
            caption={item.caption}
            showArrow
            aspectRatio="3/4"
            onClick={() => open(filteredLightbox, i)}
          />
        ))}
      </div>

      {/* Desktop scroll progress bar — scaleX driven by GSAP onUpdate */}
      <div
        className="hidden lg:block absolute bottom-0 left-0 right-0 z-20"
        style={{ height: 2 }}
        aria-hidden="true"
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--border)' }} />
        <div
          ref={progressBarRef}
          className="absolute inset-0 origin-left"
          style={{
            backgroundColor: 'rgba(200,175,120,0.7)',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </section>
  )
}
