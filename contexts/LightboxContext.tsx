'use client'

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'

export interface LightboxImage {
  src: string
  alt: string
  title?: string
  caption?: string
}

interface LightboxCtx {
  isOpen: boolean
  images: LightboxImage[]
  index: number
  open: (images: LightboxImage[], index?: number) => void
  close: () => void
  prev: () => void
  next: () => void
  goTo: (index: number) => void
}

const Ctx = createContext<LightboxCtx | null>(null)

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen]   = useState(false)
  const [images, setImages]   = useState<LightboxImage[]>([])
  const [index, setIndex]     = useState(0)

  const open = useCallback((imgs: LightboxImage[], i = 0) => {
    setImages(imgs)
    setIndex(i)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  const prev = useCallback(
    () => setIndex(i => (i - 1 + images.length) % images.length),
    [images.length]
  )

  const next = useCallback(
    () => setIndex(i => (i + 1) % images.length),
    [images.length]
  )

  const goTo = useCallback((i: number) => setIndex(i), [])

  return (
    <Ctx.Provider value={{ isOpen, images, index, open, close, prev, next, goTo }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLightbox() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLightbox must be inside LightboxProvider')
  return ctx
}
