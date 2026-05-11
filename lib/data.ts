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
    caption: 'Convocation Portrait',
    image: '/images/Graduation%20Portrait/_Q7A9135-.jpg',
    category: 'Convocation',
  },
  {
    id: 'portrait-01',
    title: 'Poise',
    caption: 'Studio Portrait · Lagos',
    image: '/images/Portraits/IMG_0033.jpg',
    category: 'Portrait',
  },
  {
    id: 'portrait-02',
    title: 'Quiet Confidence',
    caption: 'Personal Session · Lagos',
    image: '/images/Portraits/IMG_8830.jpeg',
    category: 'Portrait',
  },
  {
    id: 'family-01',
    title: 'Waiting Joy',
    caption: 'Family Portrait',
    image: '/images/Portraits/IMG_9609.jpg',
    category: 'Family',
  },
  {
    id: 'family-02',
    title: 'First Blessing',
    caption: 'Family Story',
    image: '/images/Portraits/IMG_9595.jpeg',
    category: 'Family',
  },
  {
    id: 'event-01',
    title: 'Rhythm',
    caption: 'Event Documentation',
    image: '/images/events/IMG_1105.jpeg',
    category: 'Event',
  },
  {
    id: 'event-02',
    title: 'Street Color',
    caption: 'Event Documentation',
    image: '/images/IMG_9069.jpeg',
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
    'ThePoeticGrapher didn\'t just take pictures. She captured the feeling behind the moment. Every frame felt intentional, emotional, and timeless.',
  client: 'Adaeze O.',
  session: 'Convocation Portrait',
  image: '/images/Portraits/IMG_0033.jpg',
}

// Contact details
const WHATSAPP_MESSAGE = [
  'Hi ThePoeticGrapher, I would like to book a photography session.',
  '',
  'Session type:',
  'Preferred date:',
  'Location:',
  'A little about the moment:',
].join('\n')

export const WHATSAPP_URL = `https://wa.me/2347050377154?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
export const EMAIL = 'thepoeticgrapher@gmail.com'
export const INSTAGRAM_URL = 'https://instagram.com/thepoeticgrapher'
