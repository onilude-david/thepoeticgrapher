'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Image moves at `speed` fraction of the scroll delta
  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches

  const yRange = isMobile ? [0, 0] : [`${speed * 100}px`, `-${speed * 100}px`]
  const y = useTransform(scrollYProgress, [0, 1], yRange)

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
    >
      <motion.div
        style={{ y }}
        className="absolute inset-[-15%] w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover img-bw"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>
    </div>
  )
}
