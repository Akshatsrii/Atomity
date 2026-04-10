// components/ThemeToggle.tsx
import React from 'react'

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] cursor-pointer"
      style={{
        backgroundColor: isDark ? 'var(--color-accent-primary)' : 'var(--color-border-default)',
      }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-300 flex items-center justify-center text-xs"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          transform: isDark ? 'translateX(24px)' : 'translateX(0)',
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}
