'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLightbox } from '@/contexts/LightboxContext'

export function Lightbox() {
  const { isOpen, images, index, close, prev, next, goTo } = useLightbox()
  const [dir, setDir] = useState(1)

  const image = images[index]
  const multi = images.length > 1

  const handlePrev = useCallback(() => { setDir(-1); prev() }, [prev])
  const handleNext = useCallback(() => { setDir(1);  next() }, [next])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     close()
      if (e.key === 'ArrowLeft')  handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close, handlePrev, handleNext])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && image && (
        /* ── Backdrop ────────────────────────────────────────────────── */
        <motion.div
          key="lb-backdrop"
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden px-4"
          style={{ backgroundColor: 'rgba(5,5,5,0.94)', perspective: '1200px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={close}
        >
          {/* Click transition flash */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0.24 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Aperture reveal language */}
          <motion.div
            aria-hidden="true"
            className="absolute h-[min(82vw,520px)] w-[min(82vw,520px)] rounded-full border border-[#c8af78]/20"
            initial={{ opacity: 0, scale: 0.35, rotate: -80 }}
            animate={{ opacity: [0, 0.75, 0.18], scale: [0.35, 1.12, 1], rotate: 0 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-px w-[44%] origin-left bg-[#c8af78]/30"
                style={{ transform: `rotate(${i * 30}deg) translateX(20%)` }}
                initial={{ opacity: 0, scaleX: 0.2 }}
                animate={{ opacity: [0, 0.8, 0], scaleX: [0.2, 1, 0.72] }}
                transition={{ delay: i * 0.015, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </motion.div>

          {/* ── Counter ──────────────────────────────────────────────── */}
          {multi && (
            <motion.p
              className="absolute left-1/2 top-5 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.22em] text-white/35 sm:top-6"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {index + 1} / {images.length}
            </motion.p>
          )}

          {/* ── Close ────────────────────────────────────────────────── */}
          <motion.button
            type="button"
            className="absolute right-4 top-4 z-10 min-h-11 min-w-11 text-white/55 transition-colors hover:text-white sm:right-6 sm:top-5"
            onClick={close}
            aria-label="Close lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <X size={22} strokeWidth={1.5} />
          </motion.button>

          {/* ── Image panel — 3D spring entrance ─────────────────────── */}
          <motion.div
            className="flex flex-col items-center"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: 70,  scale: 0.82, rotateX: 24, rotateZ: -1.5 }}
            animate={{ opacity: 1, y: 0,   scale: 1,    rotateX: 0,  rotateZ: 0 }}
            exit={{    opacity: 0, y: 30,   scale: 0.93, rotateX: -8 }}
            transition={{ type: 'spring', damping: 24, stiffness: 230, mass: 0.86 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* ── Inner — slides per index ─────────────────────────── */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`lb-${index}`}
                initial={{ opacity: 0, x: dir * 70, scale: 0.96, filter: 'blur(10px)', clipPath: 'inset(0 50% 0 50%)' }}
                animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', clipPath: 'inset(0 0% 0 0%)' }}
                exit={{ opacity: 0, x: dir * -70, scale: 0.97, filter: 'blur(8px)', clipPath: 'inset(0 50% 0 50%)' }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={1067}
                  priority
                  className="lb-img"
                  sizes="(max-width: 768px) 88vw, 780px"
                />
              </motion.div>
            </AnimatePresence>

            {/* ── Caption ──────────────────────────────────────────── */}
            {(image.title || image.caption) && (
              <motion.div
                className="mt-5 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {image.title && (
                  <p className="font-serif text-white lb-title">{image.title}</p>
                )}
                {image.caption && (
                  <p className="font-sans text-white/35 uppercase mt-1 lb-caption">
                    {image.caption}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* ── Prev / Next ───────────────────────────────────────────── */}
          {multi && (
            <>
              <motion.button
                type="button"
                className="absolute bottom-5 left-5 min-h-11 min-w-11 text-white/45 transition-colors hover:text-white/80 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:text-white/30"
                onClick={e => { e.stopPropagation(); handlePrev() }}
                aria-label="Previous image"
                whileHover={{ x: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ChevronLeft size={36} strokeWidth={1} />
              </motion.button>
              <motion.button
                type="button"
                className="absolute bottom-5 right-5 min-h-11 min-w-11 text-white/45 transition-colors hover:text-white/80 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:text-white/30"
                onClick={e => { e.stopPropagation(); handleNext() }}
                aria-label="Next image"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ChevronRight size={36} strokeWidth={1} />
              </motion.button>
            </>
          )}

          {/* ── Dot indicators ────────────────────────────────────────── */}
          {multi && (
            <div className="absolute bottom-[calc(5.25rem+env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6">
              {images.map((img, i) => (
                <button
                  type="button"
                  key={img.src}
                  className="lb-dot"
                  data-active={i === index ? 'true' : 'false'}
                  onClick={e => {
                    e.stopPropagation()
                    setDir(i > index ? 1 : -1)
                    goTo(i)
                  }}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
