import type { LucideIcon } from 'lucide-react'

export interface ServiceItem {
  id: string
  number: string
  title: string
  description: string
  Icon: LucideIcon
}

export interface PortfolioItem {
  id: string
  title: string
  caption: string
  image: string
  category: string
}

export interface JourneyStep {
  number: string
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface TestimonialItem {
  quote: string
  client: string
  session: string
  image?: string
}
