// components/ResourceIconsSection.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { ResourceIcon } from './ResourceIcon'
import type { ResourceType } from '../types'

const RESOURCES: { type: ResourceType; description: string; stat: string }[] = [
  { type: 'CPU', description: 'Compute allocation & utilization per pod', stat: '45% avg waste' },
  { type: 'GPU', description: 'GPU hours billed across workloads', stat: '$0.85/hr typical' },
  { type: 'RAM', description: 'Memory requests vs actual usage', stat: '38% over-requested' },
  { type: 'Storage', description: 'Persistent volume costs & waste', stat: '22% idle PVCs' },
  { type: 'Network', description: 'Ingress, egress & inter-zone traffic', stat: '12% cross-AZ hidden' },
]

export function ResourceIconsSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.15, once: true })

  return (
    <section ref={ref} aria-label="Resource breakdown" className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="fluid-h2 font-black mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
            Every resource.{' '}
            <span className="gradient-text">Every cent.</span>
          </h2>
          <p className="fluid-body max-w-lg mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Atomity tracks all five cost dimensions across every workload in real time.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {RESOURCES.map(({ type, description, stat }, i) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 36, scale: 0.82 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="flex flex-col items-center gap-3 group"
              style={{ width: 130 }}
            >
              {/* Icon box */}
              <div className="relative">
                {/* Outer ring pulse */}
                <motion.div
                  className="absolute -inset-2 rounded-3xl"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent-primary) 12%, transparent)' }}
                  animate={inView ? {
                    scale: [1, 1.12, 1],
                    opacity: [0.4, 0.7, 0.4],
                  } : {}}
                  transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
                />
                <motion.div
                  className="relative w-24 h-24 rounded-3xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-accent-primary-light) 0%, var(--color-accent-primary) 60%, var(--color-accent-primary-dark) 100%)',
                    boxShadow: 'var(--shadow-glow-sm)',
                  }}
                  whileHover={{ boxShadow: 'var(--shadow-glow)' }}
                >
                  {/* Shine */}
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.38) 0%, transparent 55%)' }} />
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={inView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.45, delay: i * 0.1 + 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ position: 'relative', zIndex: 1, color: 'var(--color-text-inverse)' }}
                  >
                    <ResourceIcon type={type} size={40} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Label */}
              <span className="text-sm font-black text-center"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                {type}
              </span>

              {/* Stat badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="text-xs text-center px-2 py-0.5 rounded-full font-semibold"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-accent-error) 10%, transparent)',
                  color: 'var(--color-accent-error)',
                }}
              >
                {stat}
              </motion.span>

              {/* Description tooltip */}
              <p className="text-xs text-center leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: 'var(--color-text-muted)' }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
