'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
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

  // Always string px values so useTransform resolves to string[] overload
  const offset = `${speed * 100}px`
  const y = useTransform(scrollYProgress, [0, 1], [offset, `-${offset}`])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div style={{ y }} className="absolute inset-0 w-full">
        {/* Extend 15% beyond container on all sides so parallax never reveals edges */}
        <div className="absolute -inset-[15%] w-[130%] h-[130%]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover img-bw"
            sizes={sizes}
            priority={priority}
          />
        </div>
      </motion.div>
    </div>
  )
}
