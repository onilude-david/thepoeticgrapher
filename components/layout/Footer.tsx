import { Instagram, MessageCircle, Mail } from 'lucide-react'
import { EMAIL, INSTAGRAM_URL, WHATSAPP_URL } from '@/lib/data'

export function Footer() {
  return (
    <footer
      id="contact"
      data-theme="dark"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#080808', borderTop: '1px solid #2A2A2A' }}
    >
      {/* Background wordmark */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <span
          className="font-serif text-white block whitespace-nowrap"
          style={{
            fontSize: 'clamp(80px, 15vw, 220px)',
            fontWeight: 400,
            opacity: 0.04,
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            transform: 'translateY(15%)',
          }}
        >
          THEPOETICGRAPHER
        </span>
      </div>

      <div className="relative z-10 max-w-container mx-auto px-6 md:px-8 pt-20 pb-10">
        {/* Top 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-16">
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
          <p
            className="font-sans text-white/30"
            style={{ fontSize: 10, letterSpacing: '0.05em' }}
          >
            &copy; 2026 ThePoeticGrapher Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
