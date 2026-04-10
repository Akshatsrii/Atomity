// components/AnimatedBubble.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CostNode } from '../types'
import { useCountUp } from '../hooks/useCountUp'

interface AnimatedBubbleProps {
  node: CostNode
  maxTotal: number
  isClickable: boolean
  index: number
  inView: boolean
  onClick: () => void
}

const MIN_H = 44
const MAX_H = 230

function BubbleInnerValue({ total, inView }: { total: number; inView: boolean }) {
  const val = useCountUp({ end: total, prefix: '$', enabled: inView, duration: 900 })
  return <span className="tabular-nums font-black text-sm" style={{ color: 'rgba(0,0,0,0.65)' }}>{val}</span>
}

export function AnimatedBubble({ node, maxTotal, isClickable, index, inView, onClick }: AnimatedBubbleProps) {
  const [hovered, setHovered] = useState(false)
  const ratio = maxTotal > 0 ? node.total / maxTotal : 0
  const targetH = MIN_H + ratio * (MAX_H - MIN_H)
  const width = Math.max(72, Math.floor(targetH * 1.08))

  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0" style={{ width: width + 8 }}>
      <div className="relative flex items-end justify-center" style={{ height: MAX_H + 20 }}>
        {/* Glow beneath bubble */}
        <motion.div
          className="absolute bottom-0 rounded-full pointer-events-none"
          style={{ width: width * 0.7, height: 12, background: 'var(--color-accent-primary)', filter: 'blur(12px)' }}
          animate={inView ? { opacity: hovered ? 0.7 : 0.3, scaleX: hovered ? 1.2 : 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          initial={{ height: 0, opacity: 0, scale: 0.7 }}
          animate={inView
            ? { height: targetH, opacity: 1, scale: hovered && isClickable ? 1.06 : 1 }
            : { height: 0, opacity: 0, scale: 0.7 }}
          transition={{
            height: { duration: 0.75, delay: index * 0.1, ease: [0.34, 1.56, 0.64, 1] },
            opacity: { duration: 0.4, delay: index * 0.1 },
            scale: { duration: 0.25, ease: 'easeOut' },
          }}
          onClick={isClickable ? onClick : undefined}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          style={{
            width,
            borderRadius: 18,
            cursor: isClickable ? 'pointer' : 'default',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(160deg, var(--color-accent-primary-light) 0%, var(--color-accent-primary) 60%, var(--color-accent-primary-dark) 100%)',
            boxShadow: hovered
              ? '0 0 40px rgba(61,220,132,0.65), 0 12px 32px rgba(61,220,132,0.3)'
              : '0 4px 20px rgba(61,220,132,0.22)',
          }}
        >
          {/* Shine overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(140deg, rgba(255,255,255,0.35) 0%, transparent 55%)' }} />

          {/* Ripple on hover */}
          <AnimatePresence>
            {hovered && isClickable && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[0, 1].map(i => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-white/40"
                    style={{ width: 40, height: 40 }}
                    animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Value on hover */}
          <AnimatePresence>
            {hovered && targetH > 70 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
              >
                <BubbleInnerValue total={node.total} inView={inView} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Drill arrow */}
          {isClickable && (
            <motion.div
              className="absolute bottom-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.18)' }}
              animate={{ scale: hovered ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.6, repeat: hovered ? Infinity : 0 }}
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M2 4.5h5M5 2.5l2 2-2 2" stroke="rgba(0,0,0,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.92 }}
              animate={{ opacity: 1, y: -8, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full mb-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap z-20 glass"
              style={{
                border: '1px solid var(--color-border-default)',
                color: 'var(--color-text-primary)',
                boxShadow: 'var(--shadow-elevated)',
              }}
            >
              <div className="font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent-primary-dark)' }}>
                {node.name}
              </div>
              <div style={{ color: 'var(--color-text-muted)' }}>
                CPU: ${node.costs.cpu.toLocaleString()} · RAM: ${node.costs.ram.toLocaleString()}
              </div>
              {isClickable && (
                <div className="mt-1" style={{ color: 'var(--color-accent-primary)' }}>
                  Click to drill down →
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.35 }}
        className="text-sm font-bold text-center leading-tight"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
      >
        {node.name}
      </motion.p>
    </div>
  )
}
