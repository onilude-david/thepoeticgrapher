import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { ClientShell } from './ClientShell'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080808',
}

export const metadata: Metadata = {
  title: 'ThePoeticGrapher Studios — Light. Camera. Poetry.',
  description:
    'A minimal photography studio capturing portraits, convocations, family moments, events, and stories with emotion, light, and meaning.',
  keywords: [
    'photography',
    'portrait photographer',
    'convocation photography',
    'event photography',
    'Nigeria photographer',
  ],
  openGraph: {
    title: 'ThePoeticGrapher Studios',
    description: 'Framing poetry, one moment at a time.',
    siteName: 'ThePoeticGrapher Studios',
    type: 'website',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThePoeticGrapher Studios — Light. Camera. Poetry.',
    description: 'Framing poetry, one moment at a time.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`light ${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <LenisProvider>
          <ClientShell>{children}</ClientShell>
        </LenisProvider>
      </body>
    </html>
  )
}
