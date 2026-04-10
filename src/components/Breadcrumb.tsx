// components/Breadcrumb.tsx
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BreadcrumbItem } from '../types'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  onNavigate: (index: number) => void
  period: string
}

export function Breadcrumb({ items, onNavigate, period }: BreadcrumbProps) {
  return (
    <div className="flex items-start gap-3 flex-wrap">
      {/* Period badge */}
      <div
        className="px-4 py-2 rounded-xl text-sm font-semibold border"
        style={{
          borderColor: 'var(--color-border-default)',
          backgroundColor: 'var(--color-bg-card)',
          color: 'var(--color-text-secondary)',
          fontFamily: 'var(--font-display)',
        }}
      >
        {period}
      </div>

      {/* Drill path */}
      <AnimatePresence mode="wait">
        <motion.div
          key={items.map(i => i.label).join('>')}
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-col gap-1"
        >
          {/* Main breadcrumb pill */}
          <div
            className="px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5"
            style={{
              backgroundColor: 'var(--color-accent-primary)',
              color: 'var(--color-text-inverse)',
              fontFamily: 'var(--font-display)',
            }}
          >
            {items.map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && (
                  <span className="opacity-60 text-xs">›</span>
                )}
                <button
                  onClick={() => onNavigate(i)}
                  className="hover:underline focus:outline-none cursor-pointer"
                  style={{ color: 'inherit', fontFamily: 'inherit' }}
                >
                  {item.label}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Aggregated by label */}
          <div
            className="px-3 py-1 rounded-lg text-xs border ml-0.5"
            style={{
              borderColor: 'var(--color-accent-primary)',
              backgroundColor: 'var(--color-bg-card)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
              Aggregated by:{' '}
            </span>
            <span className="font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
              {items[items.length - 1]?.level === 'cluster'
                ? 'Cluster'
                : items[items.length - 1]?.level === 'namespace'
                ? 'Namespace'
                : 'Pod'}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
