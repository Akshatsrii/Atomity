// components/LoadingSkeleton.tsx
import React from 'react'
import { motion } from 'framer-motion'

function Shimmer({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`rounded-xl ${className}`}
      style={{ backgroundColor: 'var(--color-border-default)' }}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export function LoadingSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex gap-4">
        <Shimmer className="h-10 w-32" />
        <Shimmer className="h-10 w-48" />
      </div>

      {/* Bubbles */}
      <div className="flex items-end gap-6 pt-4">
        {[240, 180, 130, 80].map((h, i) => (
          <motion.div
            key={i}
            className="rounded-2xl"
            style={{
              width: h + 20,
              height: h,
              backgroundColor: 'var(--color-border-default)',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* Table rows */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex gap-4">
            <Shimmer className="h-6 w-28" />
            {[1, 2, 3, 4, 5, 6, 7].map(j => (
              <Shimmer key={j} className="h-6 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
