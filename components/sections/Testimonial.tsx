'use client'

import { Bg3D } from '@/components/ui/Bg3D'
import { ImageCard } from '@/components/ui/ImageCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Tilt3D } from '@/components/ui/Tilt3D'
import { testimonial } from '@/lib/data'

export function Testimonial() {
  return (
    <section
      className="section-pad relative"
      style={{ backgroundColor: '#F3F1EC' }}
      aria-label="Client testimonial"
    >
      <Bg3D variant="light" />
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[5fr_6fr] md:gap-16">
          {/* Left: image with 3D tilt */}
          <Reveal className="order-2 md:order-1">
            {testimonial.image && (
              <div className="relative mx-auto max-w-sm md:mx-0">
                <div
                  aria-hidden="true"
                  className="absolute -left-4 -top-4 h-full w-full border border-[#c8af78]/35"
                />
                <Tilt3D intensity={8}>
                  <ImageCard
                    src={testimonial.image}
                    alt="Portrait of a happy ThePoeticGrapher Studios client"
                    aspectRatio="4/5"
                    objectPosition={testimonial.objectPosition ?? '50% 14%'}
                  />
                </Tilt3D>
                <div
                  aria-hidden="true"
                  className="absolute -bottom-5 right-5 hidden h-px w-28 bg-[#c8af78]/60 md:block"
                />
              </div>
            )}
          </Reveal>

          {/* Right: quote */}
          <div className="order-1 md:order-2">
            <Reveal>
              <SectionLabel text="Testimonial" className="mb-8" />
            </Reveal>

            <div className="relative">
              {/* Large quote mark */}
              <span
                aria-hidden="true"
                className="font-serif text-ink absolute -top-6 -left-4 leading-none select-none pointer-events-none"
                style={{ fontSize: 120, opacity: 0.08, fontWeight: 400 }}
              >
                &ldquo;
              </span>

              <Reveal delay={0.1}>
                <blockquote
                  className="font-serif text-ink relative z-10"
                  style={{ fontSize: 'clamp(1.45rem, 2.8vw, 2.45rem)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.42 }}
                  cite="ThePoeticGrapher Studios client"
                >
                  {testimonial.quote}
                </blockquote>
              </Reveal>

              <Reveal delay={0.2} className="mt-8 border-t border-warm-line pt-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                  <p
                    className="font-sans text-ink uppercase"
                    style={{ fontSize: 12, letterSpacing: '0.2em', fontWeight: 500 }}
                  >
                    {testimonial.client}
                  </p>
                  <p
                    className="font-sans text-soft-muted mt-1"
                    style={{ fontSize: 11 }}
                  >
                    {testimonial.session}
                  </p>
                  </div>
                  <p
                    className="font-sans uppercase text-muted"
                    style={{ fontSize: 9, letterSpacing: '0.2em' }}
                  >
                    Client words / real session
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
