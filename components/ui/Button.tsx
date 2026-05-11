'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'ghost' | 'hero-ghost'

interface ButtonProps {
  variant?: ButtonVariant
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

export function Button({
  variant = 'primary',
  as: Tag = 'button',
  href,
  target,
  rel,
  children,
  className,
  onClick,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })

  const activeRef = Tag === 'a' ? anchorRef : btnRef

  function onMouseMove(e: React.MouseEvent) {
    const el = activeRef.current
    if (!el) return
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) return
    const rect = el.getBoundingClientRect()
    setTranslate({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.35,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.35,
    })
  }

  function onMouseLeave() {
    setTranslate({ x: 0, y: 0 })
  }

  const base =
    'inline-flex min-h-11 items-center justify-center font-sans uppercase cursor-pointer select-none active:scale-[0.97]'
  const variantClass: Record<ButtonVariant, string> = {
    primary: 'bg-ink text-white border border-ink hover:bg-white hover:text-ink',
    ghost: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-white',
    'hero-ghost': 'bg-transparent text-white border border-white/50 hover:bg-white hover:text-ink',
  }

  const sharedStyle: React.CSSProperties = {
    fontSize: 11,
    letterSpacing: '0.16em',
    fontWeight: 600,
    padding: '12px 32px',
    transform: `translate(${translate.x}px, ${translate.y}px)`,
    transition: [
      'background-color 0.35s cubic-bezier(0.22,1,0.36,1)',
      'color 0.35s cubic-bezier(0.22,1,0.36,1)',
      'border-color 0.35s cubic-bezier(0.22,1,0.36,1)',
      'transform 0.2s cubic-bezier(0.22,1,0.36,1)',
    ].join(', '),
  }

  const combined = cn(base, variantClass[variant], className)

  if (Tag === 'a' && href) {
    return (
      <a
        ref={anchorRef}
        href={href}
        target={target}
        rel={rel}
        className={combined}
        style={sharedStyle}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      className={combined}
      style={sharedStyle}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
