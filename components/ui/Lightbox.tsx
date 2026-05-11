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
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(5,5,5,0.94)', perspective: '1200px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={close}
        >
          {/* ── Counter ──────────────────────────────────────────────── */}
          {multi && (
            <motion.p
              className="absolute top-6 left-1/2 -translate-x-1/2 font-sans text-white/35 uppercase tracking-[0.22em] text-[10px]"
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
            className="absolute top-5 right-6 text-white/40 hover:text-white transition-colors z-10"
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
            initial={{ opacity: 0, y: 60,  scale: 0.86, rotateX: 20 }}
            animate={{ opacity: 1, y: 0,   scale: 1,    rotateX: 0  }}
            exit={{    opacity: 0, y: 30,   scale: 0.93, rotateX: -8 }}
            transition={{ type: 'spring', damping: 26, stiffness: 200, mass: 0.9 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* ── Inner — slides per index ─────────────────────────── */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`lb-${index}`}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{    opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
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
                className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/80 transition-colors"
                onClick={e => { e.stopPropagation(); handlePrev() }}
                aria-label="Previous image"
                whileHover={{ x: -3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ChevronLeft size={36} strokeWidth={1} />
              </motion.button>
              <motion.button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/80 transition-colors"
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
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
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
