'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isOnDark, setIsOnDark] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }

      // Check if over dark background
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const section = el?.closest('[data-theme="dark"]')
      setIsOnDark(!!section)
    }

    function onHoverStart(e: MouseEvent) {
      const target = e.target as Element
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(true)
      }
    }

    function onHoverEnd(e: MouseEvent) {
      const target = e.target as Element
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(false)
      }
    }

    function animate() {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12

      if (ringRef.current) {
        const size = isHovering ? 56 : 36
        ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`
      }

      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onHoverStart)
    window.addEventListener('mouseout', onHoverEnd)
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onHoverStart)
      window.removeEventListener('mouseout', onHoverEnd)
      cancelAnimationFrame(raf.current)
    }
  }, [isHovering])

  const color = isOnDark ? '#FFFFFF' : '#111111'

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor fixed left-0 top-0 z-[9998] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: color,
          willChange: 'transform',
          transition: 'background-color 0.3s',
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor fixed left-0 top-0 z-[9997] pointer-events-none"
        style={{
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          borderRadius: '50%',
          border: `1px solid ${color}`,
          opacity: isHovering ? 0.2 : 0.4,
          willChange: 'transform',
          transition: 'width 0.3s, height 0.3s, opacity 0.3s, border-color 0.3s',
        }}
      />
    </>
  )
}
