'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
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
      className="border-b border-border"
      style={{ borderColor: 'var(--border)' }}
    >
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span
          className="font-serif text-ink pr-8"
          style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.3 }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
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
      className="section-pad"
      style={{ backgroundColor: '#FAF9F6' }}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
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
