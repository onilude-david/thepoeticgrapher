import { Instagram, MessageCircle, Mail, ArrowUpRight } from 'lucide-react'
import { BOOKING_FORM_HREF, EMAIL, INSTAGRAM_URL, WEBSITE_URL, WHATSAPP_URL } from '@/lib/data'

export function Footer() {
  return (
    <footer
      id="contact"
      data-theme="dark"
      className="relative overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 72% 18%, rgba(200,175,120,0.11), transparent 24%), #080808',
        borderTop: '1px solid #2A2A2A',
      }}
    >
      {/* Background wordmark */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <span
          className="block break-all font-serif text-white md:whitespace-nowrap"
          style={{
            fontSize: 'clamp(42px, 13vw, 220px)',
            fontWeight: 400,
            opacity: 0.04,
            lineHeight: 0.78,
            letterSpacing: '0',
            transform: 'translateY(10%)',
          }}
        >
          THEPOETICGRAPHER
        </span>
      </div>

      <div className="relative z-10 max-w-container mx-auto px-6 pb-28 pt-20 md:px-8 md:pb-10">
        <div className="mb-16 border-y border-white/10 py-8 md:py-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <h2
              className="font-serif text-white"
              style={{ fontSize: 'clamp(2.35rem, 7vw, 5.5rem)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '0' }}
            >
              Let&rsquo;s Frame
              <br />
              Your Story.
            </h2>
            <a
              href={BOOKING_FORM_HREF}
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/25 px-6 font-sans text-white transition-colors duration-300 hover:bg-white hover:text-ink"
              style={{ fontSize: 10, letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase' }}
            >
              Start a Booking
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Top 3-column grid */}
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-3 md:gap-8">
          {/* Col 1: Heading */}
          <div>
            <p
              className="font-sans text-white/40 uppercase mb-5"
              style={{ fontSize: 10, letterSpacing: '0.22em', fontWeight: 600 }}
            >
              Contact
            </p>
            <h2
              className="font-serif text-white"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 400, lineHeight: 1.2 }}
            >
              Let&rsquo;s Frame
              <br />
              Your Story.
            </h2>
            <p
              className="mt-5 max-w-xs font-sans text-white/35"
              style={{ fontSize: 13, lineHeight: 1.7 }}
            >
              Portraits, milestones, families, and events across Lagos and beyond.
            </p>
          </div>

          {/* Col 2: Body + email */}
          <div>
            <p
              className="font-sans mb-6"
              style={{ fontSize: 15, lineHeight: 1.75, color: '#6F6F6F' }}
            >
              Whether it&rsquo;s a milestone, a memory, or a moment you want to hold forever — we&rsquo;d love to hear about it.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="font-sans text-white hover:text-warm-line transition-colors duration-300"
              style={{ fontSize: 14, letterSpacing: '0.05em' }}
            >
              {EMAIL}
            </a>
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block font-sans text-white/50 hover:text-white transition-colors duration-300"
              style={{ fontSize: 13, letterSpacing: '0.05em' }}
            >
              thepoeticgrapher.com.ng
            </a>
          </div>

          {/* Col 3: Social links */}
          <div>
            <p
              className="font-sans text-white/40 uppercase mb-5"
              style={{ fontSize: 10, letterSpacing: '0.22em', fontWeight: 600 }}
            >
              Connect
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300"
                style={{ fontSize: 13 }}
              >
                <Instagram size={16} strokeWidth={1.5} />
                <span className="font-sans" style={{ letterSpacing: '0.05em' }}>Instagram</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300"
                style={{ fontSize: 13 }}
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                <span className="font-sans" style={{ letterSpacing: '0.05em' }}>WhatsApp</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300"
                style={{ fontSize: 13 }}
              >
                <Mail size={16} strokeWidth={1.5} />
                <span className="font-sans" style={{ letterSpacing: '0.05em' }}>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-6"
          style={{ borderTop: '1px solid #1A1A1A' }}
        >
          <p
            className="font-sans text-white/30 uppercase"
            style={{ fontSize: 10, letterSpacing: '0.2em' }}
          >
            Light. Camera. Poetry.
          </p>
          <div className="flex flex-col gap-2 sm:items-end">
            <p
              className="font-sans text-white/30"
              style={{ fontSize: 10, letterSpacing: '0.05em' }}
            >
              &copy; 2026 ThePoeticGrapher Studios. All rights reserved.
            </p>
            <p
              className="font-sans text-white/30"
              style={{ fontSize: 10, letterSpacing: '0.05em' }}
            >
              Made with <span aria-label="love and fire">❤️‍🔥</span> By{' '}
              <a
                href="https://beeresoftwares.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/55 underline decoration-[#c8af78]/45 underline-offset-4 transition-colors duration-300 hover:text-white"
              >
                Beere Softwares
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
