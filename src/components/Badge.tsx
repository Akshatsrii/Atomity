// components/Badge.tsx
import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'outline' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  const base = 'inline-flex items-center font-semibold rounded-full whitespace-nowrap'

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
  }

  const variantClasses = {
    default: 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]',
    accent: 'bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)]',
    outline: 'border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] bg-transparent',
    success: 'bg-[color-mix(in_srgb,var(--color-accent-success)_15%,transparent)] text-[var(--color-accent-success)]',
    warning: 'bg-[color-mix(in_srgb,var(--color-accent-warning)_15%,transparent)] text-[var(--color-accent-warning)]',
    error: 'bg-[color-mix(in_srgb,var(--color-accent-error)_15%,transparent)] text-[var(--color-accent-error)]',
  }

  return (
    <span className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
