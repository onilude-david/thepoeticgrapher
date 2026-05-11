'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Reveal } from '@/components/ui/Reveal'
import { faqItems } from '@/lib/data'

interface AccordionItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

function AccordionItem({ question, answer, isOpen, onToggle, index }: AccordionItemProps) {
  const panelId = `faq-panel-${index}`
  const triggerId = `faq-trigger-${index}`

  return (
    <div
      className="border-b border-border transition-colors duration-300 hover:bg-white/45"
      style={{ borderColor: 'var(--border)' }}
    >
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="group flex w-full items-center justify-between py-6 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span
          className="pr-8 font-serif text-ink transition-colors duration-300 group-hover:text-black"
          style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.3 }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-border transition-colors duration-300 group-hover:border-[#c8af78]/70"
          aria-hidden="true"
        >
          <Plus size={20} strokeWidth={1.5} className="text-ink" />
        </motion.div>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p
            className="font-sans text-muted pb-6"
            style={{ fontSize: 15, lineHeight: 1.75 }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: '#FAF9F6' }}
      aria-labelledby="faq-heading"
    >
      <div
        aria-hidden="true"
        className="absolute -left-32 top-20 h-80 w-80 rounded-full border border-[#c8af78]/15"
      />
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-[4fr_6fr] md:gap-20">
          {/* Left: heading */}
          <div>
            <Reveal>
              <SectionLabel text="FAQ" className="mb-6" />
            </Reveal>
            <AnimatedHeading
              id="faq-heading"
              as="h2"
              className="font-serif text-ink"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Common Questions.
            </AnimatedHeading>
            <Reveal delay={0.1} className="mt-6">
              <p
                className="font-sans text-muted"
                style={{ fontSize: 15, lineHeight: 1.75 }}
              >
                If your question isn&rsquo;t here, just reach out — we&rsquo;re easy to talk to.
              </p>
            </Reveal>
            <Reveal delay={0.18} className="mt-8">
              <a
                href="#contact"
                className="font-sans uppercase text-ink underline decoration-[#c8af78]/60 underline-offset-8 transition-colors hover:text-muted"
                style={{ fontSize: 10, letterSpacing: '0.18em', fontWeight: 600 }}
              >
                Talk to us directly
              </a>
            </Reveal>
          </div>

          {/* Right: accordion */}
          <div>
            <div className="border-t border-border">
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
