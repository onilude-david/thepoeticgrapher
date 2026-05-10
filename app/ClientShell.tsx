'use client'

import { useState, useCallback } from 'react'
import { Preloader } from '@/components/layout/Preloader'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { Header } from '@/components/layout/Header'
import { BookingCTA } from '@/components/ui/BookingCTA'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  const handlePreloaderComplete = useCallback(() => {
    setReady(true)
  }, [])

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <CustomCursor />
      <ScrollProgress />
      <Header ready={ready} />
      <main>{children}</main>
      <BookingCTA />
    </>
  )
}
