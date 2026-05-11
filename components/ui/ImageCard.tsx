'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageCardProps {
  src: string
  alt: string
  title?: string
  caption?: string
  showArrow?: boolean
  className?: string
  aspectRatio?: string
  objectPosition?: string
  priority?: boolean
  onClick?: () => void
}

export function ImageCard({
  src,
  alt,
  title,
  caption,
  showArrow = false,
  className,
  aspectRatio = '2/3',
  objectPosition = 'top',
  priority = false,
  onClick,
}: ImageCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const shouldReduce = useReducedMotion()
  const [clicked, setClicked] = useState(false)

  const Wrapper = onClick ? 'button' : 'div'

  function handleClick() {
    if (!onClick) return
    if (!shouldReduce) {
      setClicked(true)
      window.setTimeout(() => setClicked(false), 360)
      window.setTimeout(onClick, 130)
      return
    }
    onClick()
  }

  return (
    <Wrapper
      ref={ref as never}
      type={onClick ? 'button' : undefined}
      className={cn('relative overflow-hidden group transition-transform duration-200 active:scale-[0.985]', onClick && 'block w-full cursor-pointer text-left', className)}
      onClick={handleClick}
    >
      {/* Clip-path image reveal */}
      <motion.div
        className="w-full overflow-hidden"
        style={{ aspectRatio }}
        initial={shouldReduce ? {} : { clipPath: 'inset(100% 0 0 0)' }}
        animate={shouldReduce ? {} : isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative w-full h-full"
          initial={shouldReduce ? {} : { scale: 1.12 }}
          animate={shouldReduce ? {} : isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className={cn(
              'object-cover img-bw transition-transform duration-500 group-hover:scale-[1.04]'
            )}
            style={{ objectPosition }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {clicked && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute inset-y-0 left-1/2 w-px bg-[#c8af78]/70 shadow-[0_0_28px_rgba(200,175,120,0.65)]"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: [0, 1, 0] }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="absolute inset-0 border border-[#c8af78]/55"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: [0, 0.85, 0] }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for cards with text */}
      {(title || caption) && (
        <div
          className="absolute inset-0 flex flex-col justify-end p-3 pointer-events-none sm:p-5"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
          }}
        >
          <div className="flex min-w-0 items-end justify-between gap-2">
            <div className="min-w-0">
              {title && (
                <p
                  className="font-serif text-white"
                  style={{ fontSize: 'clamp(16px, 4.7vw, 20px)', fontWeight: 400, lineHeight: 1.15 }}
                >
                  {title}
                </p>
              )}
              {caption && (
                <p
                  className="font-sans text-soft-muted uppercase mt-1"
                  style={{ fontSize: 'clamp(8px, 2.5vw, 10px)', letterSpacing: '0.16em', lineHeight: 1.25 }}
                >
                  {caption}
                </p>
              )}
            </div>
            {showArrow && (
              <ArrowRight size={14} strokeWidth={1.5} className="mb-0.5 flex-shrink-0 text-white" />
            )}
          </div>
        </div>
      )}
    </Wrapper>
  )
}
