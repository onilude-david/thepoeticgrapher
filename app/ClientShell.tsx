'use client'

import { useState, useCallback } from 'react'
import { Preloader } from '@/components/layout/Preloader'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { Header } from '@/components/layout/Header'
import { BookingCTA } from '@/components/ui/BookingCTA'
import { Lightbox } from '@/components/ui/Lightbox'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { LightboxProvider } from '@/contexts/LightboxContext'
import { ReadyProvider } from '@/contexts/ReadyContext'

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  const handlePreloaderComplete = useCallback(() => {
    setReady(true)
  }, [])

  return (
    <LightboxProvider>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      <ScrollProgress />
      <Header ready={ready} />
      <ReadyProvider ready={ready}>
        <main>{children}</main>
      </ReadyProvider>
      <BookingCTA />
      <Lightbox />
    </LightboxProvider>
  )
}
