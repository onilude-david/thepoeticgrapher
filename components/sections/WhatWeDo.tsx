'use client'

import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { ImageCard } from '@/components/ui/ImageCard'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Tilt3D } from '@/components/ui/Tilt3D'
import { WHATSAPP_URL } from '@/lib/data'

export function WhatWeDo() {
  return (
    <section
      id="about"
      className="section-pad"
      style={{ backgroundColor: '#FAF9F6' }}
      aria-labelledby="about-heading"
    >
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: content */}
          <div>
            <Reveal delay={0}>
              <SectionLabel text="What We Do" className="mb-6" />
            </Reveal>

            <AnimatedHeading
              id="about-heading"
              as="h2"
              className="font-serif text-ink text-section mb-8"
              style={{ lineHeight: 1.04, letterSpacing: '-0.02em' }}
            >
              We Notice Meaning.
            </AnimatedHeading>

            <Reveal delay={0.15}>
              <div
                className="font-sans text-muted mb-10 space-y-4"
                style={{ fontSize: 16, lineHeight: 1.75 }}
              >
                <p>
                  ThePoeticGrapher Studios is built on one simple belief: every meaningful moment deserves to be remembered with care.
                </p>
                <p>
                  We capture portraits, milestones, events, and personal stories with attention to light, emotion, and detail.
                </p>
                <p className="text-ink font-sans" style={{ fontWeight: 500 }}>
                  Not just how it looked. How it felt.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
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

          {/* Right: 2x2 image grid with 3D tilt */}
          <div className="grid grid-cols-2 gap-3">
            <Tilt3D intensity={7}>
              <ImageCard
                src="/images/Graduation%20Portrait/_Q7A9135-.jpg"
                alt="Convocation portrait — a graduate in academic regalia, framed with quiet pride"
                aspectRatio="4/5"
              />
            </Tilt3D>
            <Tilt3D intensity={7} className="mt-6">
              <ImageCard
                src="/images/Portraits/IMG_9787-2.jpeg"
                alt="Personal portrait session — soft natural light on a subject at ease"
                aspectRatio="4/5"
              />
            </Tilt3D>
            <Tilt3D intensity={7} className="-mt-6">
              <ImageCard
                src="/images/Portraits/IMG_9793-2.jpeg"
                alt="Portrait session — an honest, unhurried moment between subject and light"
                aspectRatio="4/5"
              />
            </Tilt3D>
            <Tilt3D intensity={7}>
              <ImageCard
                src="/images/events/IMG_0368.jpeg"
                alt="Event documentation — guests gathered in celebration, a moment preserved"
                aspectRatio="4/5"
              />
            </Tilt3D>
          </div>
        </div>
      </div>
    </section>
  )
}
