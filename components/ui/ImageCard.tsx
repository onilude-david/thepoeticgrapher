'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'
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
  priority?: boolean
}

export function ImageCard({
  src,
  alt,
  title,
  caption,
  showArrow = false,
  className,
  aspectRatio = '2/3',
  priority = false,
}: ImageCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className={cn('relative overflow-hidden group', className)}>
      {/* Clip-path image reveal */}
      <motion.div
        className="w-full overflow-hidden"
        style={{ aspectRatio }}
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.12 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className={cn(
              'object-cover img-bw transition-transform duration-500 group-hover:scale-[1.04]'
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priority}
          />
        </motion.div>
      </motion.div>

      {/* Overlay for cards with text */}
      {(title || caption) && (
        <div
          className="absolute inset-0 flex flex-col justify-end p-5 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
          }}
        >
          <div className="flex items-end justify-between">
            <div>
              {title && (
                <p
                  className="font-serif text-white"
                  style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.2 }}
                >
                  {title}
                </p>
              )}
              {caption && (
                <p
                  className="font-sans text-soft-muted uppercase mt-1"
                  style={{ fontSize: 10, letterSpacing: '0.2em' }}
                >
                  {caption}
                </p>
              )}
            </div>
            {showArrow && (
              <ArrowRight size={14} strokeWidth={1.5} className="text-white mb-0.5" />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
