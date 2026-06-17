import { GraduationCap, User, Users, Calendar } from 'lucide-react'
import type {
  ServiceItem,
  PackageItem,
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
    image: '/images/Graduation%20Portrait/_Q7A9135-.jpg',
    objectPosition: '50% 16%',
    Icon: GraduationCap,
  },
  {
    id: 'personal',
    number: '02',
    title: 'Personal Sessions',
    description:
      'For birthdays, lifestyle portraits, creative shoots, and moments where you want to see yourself beautifully.',
    image: '/images/Portraits/1001639215.jpeg',
    objectPosition: '50% 12%',
    Icon: User,
  },
  {
    id: 'family',
    number: '03',
    title: 'Family & Friend Portraits',
    description:
      'For connection, laughter, warmth, and the people who make life meaningful.',
    image: '/images/Portraits/IMG_9609.jpg',
    Icon: Users,
  },
  {
    id: 'events',
    number: '04',
    title: 'Event Documentation',
    description:
      'For birthdays, ceremonies, church events, private gatherings, and celebrations that deserve to be remembered.',
    image: '/images/events/IMG_0422.jpeg',
    objectPosition: '50% 18%',
    Icon: Calendar,
  },
]

export const packages: PackageItem[] = [
  {
    id: 'basic',
    number: '01',
    name: 'Basic Package',
    subtitle: 'A quiet way to hold the moment properly. Something simple but meaningful.',
    price: '₦40,000',
    details: ['1 outfit', '4 edited images'],
  },
  {
    id: 'essentials-family',
    number: '02',
    name: 'Essentials Family Package',
    subtitle: 'For family warmth, soft connection, and portraits that feel like home.',
    price: '₦80,000',
    details: ['7-10 edited images', '+1 frame'],
    featured: true,
  },
  {
    id: 'keepsakes',
    number: '03',
    name: 'Keepsakes',
    subtitle: 'For a framed memory and a small set of carefully finished photographs.',
    price: '₦70,000',
    details: ['5 edited pictures', '+1 frame'],
  },
  {
    id: 'group-of-4',
    number: '04',
    name: 'Group of 4',
    subtitle: 'For friends, siblings, teams, or a shared milestone with individual keepsakes.',
    price: '₦120,000',
    details: ['4 people', '4 pictures each'],
  },
]

export const packageAddOns = [
  {
    title: 'Cinematic Graduation Reel',
    note: 'Best seller',
    description: 'Short video clips edited into a beautiful reel for Instagram or a personal keepsake.',
  },
  {
    title: 'Extra Edited Images',
    description: 'Add more finished photographs to your final delivery.',
  },
  {
    title: 'Priority Delivery',
    description: 'For moments that need a faster turnaround.',
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
    image: '/images/Portraits/IMG_0036.jpg',
    category: 'Portrait',
    objectPosition: '50% 16%',
  },
  {
    id: 'portrait-02',
    title: 'Quiet Confidence',
    caption: 'Personal Session · Lagos',
    image: '/images/Portraits/IMG_8830.jpeg',
    category: 'Portrait',
    objectPosition: '50% 15%',
  },
  {
    id: 'family-01',
    title: 'Waiting Joy',
    caption: 'Family Portrait',
    image: '/images/Portraits/IMG_4379.jpeg',
    category: 'Family',
    objectPosition: '50% 18%',
  },
  {
    id: 'family-02',
    title: 'First Blessing',
    caption: 'Family Story',
    image: '/images/Portraits/IMG_9595.jpeg',
    category: 'Family',
    objectPosition: '50% 12%',
  },
  {
    id: 'event-01',
    title: 'Rhythm',
    caption: 'Event Documentation',
    image: '/images/events/IMG_1105.jpeg',
    category: 'Event',
    objectPosition: '50% 12%',
  },
  {
    id: 'event-02',
    title: 'Street Color',
    caption: 'Event Documentation',
    image: '/images/IMG_9069.jpeg',
    category: 'Event',
    objectPosition: '50% 14%',
  },
  {
    id: 'event-03',
    title: 'Gathered Light',
    caption: 'Event Documentation',
    image: '/images/events/IMG_0368.jpeg',
    category: 'Event',
    objectPosition: '50% 18%',
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
  client: 'Plesant O.',
  session: 'Convocation Portrait',
  image: '/images/Portraits/IMG_0033.jpg',
  objectPosition: '50% 14%',
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
export const WEBSITE_URL = 'https://thepoeticgrapher.com.ng'
export const BOOKING_FORM_HREF = '#package-inquiry'

interface PackageInquiryDetails {
  name?: string
  date?: string
  location?: string
  moment?: string
}

export function getPackageWhatsAppUrl(packageName: string, details: PackageInquiryDetails = {}) {
  const message = [
    'Hi ThePoeticGrapher, I would like to learn more about a package.',
    '',
    `Package: ${packageName}`,
    `Name: ${details.name || ''}`,
    `Preferred date: ${details.date || ''}`,
    `Location: ${details.location || ''}`,
    `A little about the moment: ${details.moment || ''}`,
  ].join('\n')

  return `https://wa.me/2347050377154?text=${encodeURIComponent(message)}`
}
