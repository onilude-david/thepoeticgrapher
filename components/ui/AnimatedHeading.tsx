'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/lib/gsap'
import { cn } from '@/lib/utils'

interface AnimatedHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: string
  as?: 'h1' | 'h2' | 'h3'
  delay?: number
  triggerOnMount?: boolean
}

export function AnimatedHeading({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
  triggerOnMount = false,
  style,
  ...rest
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return

      const isMobile = window.matchMedia('(max-width: 1023px)').matches
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReduced) {
        gsap.set(ref.current, { opacity: 1 })
        return
      }

      gsap.set(ref.current, { opacity: 1 })

      if (isMobile) {
        gsap.from(ref.current, {
          y: 18,
          opacity: 0,
          duration: 0.65,
          ease: 'power3.out',
          delay,
          scrollTrigger: triggerOnMount || Tag === 'h1'
            ? undefined
            : {
                trigger: ref.current,
                start: 'top 88%',
                once: true,
              },
        })
        return
      }

      const split = SplitText.create(ref.current, {
        type: 'chars, words',
        mask: 'chars',
        autoSplit: true,
      })

      const targets = split.chars

      const animProps = {
        yPercent: 110,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out' as const,
        stagger: 0.022,
        delay,
      }

      if (triggerOnMount || Tag === 'h1') {
        gsap.from(targets, animProps)
      } else {
        gsap.from(targets, {
          ...animProps,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            once: true,
          },
        })
      }
    },
    { scope: ref, dependencies: [children, delay, triggerOnMount] }
  )

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      style={{ opacity: 0, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
