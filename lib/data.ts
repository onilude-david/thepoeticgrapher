import { GraduationCap, User, Users, Calendar } from 'lucide-react'
import type {
  ServiceItem,
  PortfolioItem,
  JourneyStep,
  FAQItem,
  TestimonialItem,
} from '@/types'

export const services: ServiceItem[] = [
  {
    id: 'convocation',
    number: '01',
    title: 'Convocation Portraits',
    description:
      'For the milestone, the pride, the sacrifice, and the story behind the achievement.',
    Icon: GraduationCap,
  },
  {
    id: 'personal',
    number: '02',
    title: 'Personal Sessions',
    description:
      'For birthdays, lifestyle portraits, creative shoots, and moments where you want to see yourself beautifully.',
    Icon: User,
  },
  {
    id: 'family',
    number: '03',
    title: 'Family & Friend Portraits',
    description:
      'For connection, laughter, warmth, and the people who make life meaningful.',
    Icon: Users,
  },
  {
    id: 'events',
    number: '04',
    title: 'Event Documentation',
    description:
      'For birthdays, ceremonies, church events, private gatherings, and celebrations that deserve to be remembered.',
    Icon: Calendar,
  },
]

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'convocation-01',
    title: 'The Ceremony',
    caption: 'Convocation · University of Lagos',
    image: 'https://picsum.photos/seed/conv1/800/1100',
    category: 'Convocation',
  },
  {
    id: 'portrait-01',
    title: 'Solitude',
    caption: 'Personal Session · Lagos',
    image: 'https://picsum.photos/seed/port1/800/1100',
    category: 'Portrait',
  },
  {
    id: 'family-01',
    title: 'Sunday Light',
    caption: 'Family Session · Lekki',
    image: 'https://picsum.photos/seed/fam1/800/1100',
    category: 'Family',
  },
  {
    id: 'event-01',
    title: 'The Gathering',
    caption: 'Event · Victoria Island',
    image: 'https://picsum.photos/seed/evt1/800/1100',
    category: 'Event',
  },
]

export const journeySteps: JourneyStep[] = [
  {
    number: '01',
    title: 'Reach Out',
    description:
      'Send a message on WhatsApp or email. Tell us a little about the moment you want to capture.',
  },
  {
    number: '02',
    title: 'We Consult',
    description:
      'A short conversation about your vision, location, timing, and what matters most to you.',
  },
  {
    number: '03',
    title: 'The Session',
    description:
      'We show up, we listen, we notice. Every frame is made with intention.',
  },
  {
    number: '04',
    title: 'Your Story',
    description:
      'Carefully edited photographs delivered to you — images that feel like memory.',
  },
]

export const faqItems: FAQItem[] = [
  {
    question: 'How do I book a session?',
    answer:
      'Send a message via WhatsApp or email with the type of session you have in mind, your preferred date, and location. We will confirm availability and send you the details.',
  },
  {
    question: 'How long does a session take?',
    answer:
      'Personal and portrait sessions run 1–2 hours. Convocation sessions vary by event schedule. Event documentation is typically billed hourly.',
  },
  {
    question: 'When will I receive my photographs?',
    answer:
      'Edited photographs are delivered within 7–14 days after the session. Rush delivery is available on request.',
  },
  {
    question: 'Do you shoot outside Lagos?',
    answer:
      'Yes. Travel is available for the right brief. Reach out and we can discuss logistics and fees.',
  },
  {
    question: 'What should I wear or bring?',
    answer:
      'We will guide you through this in our consultation. Generally: wear what feels like you. Avoid loud patterns. Bring what matters — your people, your mood, your moment.',
  },
]

export const testimonial: TestimonialItem = {
  quote:
    'ThePoeticGrapher didn\'t just take pictures. He captured the feeling behind the moment. Every frame felt intentional, emotional, and timeless.',
  client: 'Adaeze O.',
  session: 'Convocation Portrait',
  image: 'https://picsum.photos/seed/test1/600/800',
}

// Contact details
export const WHATSAPP_URL =
  'https://wa.me/2348000000000?text=Hi%2C%20I%27d%20like%20to%20book%20a%20photography%20session.' // TODO: Replace WhatsApp number
export const EMAIL = 'hello@thepoeticgrapher.com'
export const INSTAGRAM_URL = 'https://instagram.com/thepoeticgrapher'
