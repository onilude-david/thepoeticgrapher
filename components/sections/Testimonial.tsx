'use client'

import { SectionLabel } from '@/components/ui/SectionLabel'
import { ImageCard } from '@/components/ui/ImageCard'
import { Reveal } from '@/components/ui/Reveal'
import { Tilt3D } from '@/components/ui/Tilt3D'
import { testimonial } from '@/lib/data'

export function Testimonial() {
  return (
    <section
      className="section-pad"
      style={{ backgroundColor: '#F3F1EC' }}
      aria-label="Client testimonial"
    >
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: image with 3D tilt */}
          <Reveal className="order-2 md:order-1">
            {testimonial.image && (
              <Tilt3D intensity={8} className="max-w-sm mx-auto md:mx-0">
                <ImageCard
                  src={testimonial.image}
                  alt="Portrait of a happy ThePoeticGrapher Studios client"
                  aspectRatio="3/4"
                />
              </Tilt3D>
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
                  style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.55 }}
                  cite="ThePoeticGrapher Studios client"
                >
                  {testimonial.quote}
                </blockquote>
              </Reveal>

              <Reveal delay={0.2} className="mt-8">
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
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
