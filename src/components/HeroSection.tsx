// components/HeroSection.tsx
import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

function StatCard({ value, label, suffix = '', prefix = '$', delay, color = 'var(--color-accent-primary)' }: {
  value: number; label: string; suffix?: string; prefix?: string; delay: number; color?: string
}) {
  const { ref, inView } = useInView({ threshold: 0.4 })
  const display = useCountUp({ end: value, prefix, suffix, enabled: inView, duration: 1600 })
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -5, scale: 1.04 }}
      className="cost-card-container glow-card flex flex-col gap-1.5 p-5 rounded-2xl relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border-default)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full -mr-8 -mt-8"
        style={{ backgroundColor: `color-mix(in srgb, ${color} 8%, transparent)` }} />
      <span
        className="cost-card-value tabular-nums text-3xl font-black gradient-text-warm"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {display}
      </span>
      <span className="cost-card-label text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </span>
    </motion.div>
  )
}

// Floating particle
function Particle({ x, y, delay, size = 6 }: { x: number; y: number; delay: number; size?: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`, top: `${y}%`, width: size, height: size,
        backgroundColor: 'var(--color-accent-primary)',
        opacity: 0.35,
      }}
      animate={{
        y: [0, -24, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.4, 1],
      }}
      transition={{ duration: 3 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

// Animated bubble preview card
function MiniDashCard() {
  const { ref, inView } = useInView({ threshold: 0.3 })
  const bars = [
    { h: 85, label: 'Cluster A', delay: 0 },
    { h: 62, label: 'Cluster B', delay: 0.1 },
    { h: 45, label: 'Cluster C', delay: 0.2 },
    { h: 28, label: 'Cluster D', delay: 0.3 },
  ]
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative rounded-3xl p-5 overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border-default)',
        boxShadow: 'var(--shadow-elevated)',
        perspective: '800px',
      }}
    >
      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent-primary), transparent)' }}
        animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
      />

      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ backgroundColor: 'var(--color-accent-primary)' }} />
          <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}>
            Last 30 Days
          </span>
        </div>
        <span className="text-xs px-2 py-1 rounded-full font-semibold"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent-primary) 12%, transparent)', color: 'var(--color-accent-primary-dark)' }}>
          Live
        </span>
      </div>

      {/* Mini bubbles */}
      <div className="flex items-end gap-3 mb-4" style={{ height: 100 }}>
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-xl flex items-end justify-center pb-1 relative overflow-hidden"
            style={{
              backgroundColor: 'var(--color-bubble-fill)',
              boxShadow: 'var(--shadow-glow-sm)',
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: bar.h } : { height: 0 }}
            transition={{ duration: 0.7, delay: bar.delay + 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 60%)' }} />
          </motion.div>
        ))}
      </div>

      {/* Labels */}
      <div className="flex gap-3">
        {bars.map((bar, i) => (
          <motion.span
            key={i}
            className="flex-1 text-center text-xs font-semibold truncate"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)', fontSize: '0.6rem' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 + i * 0.07 }}
          >
            {bar.label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export function HeroSection({ onNavigate }: { onNavigate: (p: string) => void }) {
  const { ref, inView } = useInView({ threshold: 0.05 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const particles = [
    { x: 8, y: 20, delay: 0, size: 5 }, { x: 15, y: 65, delay: 0.8, size: 8 },
    { x: 88, y: 15, delay: 0.3, size: 6 }, { x: 92, y: 70, delay: 1.2, size: 4 },
    { x: 45, y: 88, delay: 0.5, size: 7 }, { x: 72, y: 40, delay: 1.5, size: 5 },
    { x: 28, y: 35, delay: 0.2, size: 4 }, { x: 60, y: 18, delay: 1.0, size: 6 },
  ]

  return (
    <section
      ref={containerRef}
      aria-label="Hero section"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden dot-grid"
    >
      {/* Particles */}
      {particles.map((p, i) => <Particle key={i} {...p} />)}

      {/* Big glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          style={{ y: y1, opacity }}
          className="w-[700px] h-[500px] rounded-full"
          animate={{
            background: [
              'radial-gradient(ellipse, rgba(61,220,132,0.15) 0%, transparent 70%)',
              'radial-gradient(ellipse, rgba(61,220,132,0.22) 0%, transparent 70%)',
              'radial-gradient(ellipse, rgba(61,220,132,0.15) 0%, transparent 70%)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ filter: 'blur(60px)', y: y1, opacity }}
        />
      </div>

      {/* Orbiting ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ y: y2 }}
          className="absolute w-[500px] h-[500px] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="500" height="500" viewBox="0 0 500 500" className="w-full h-full">
            <circle cx="250" cy="250" r="220" fill="none"
              stroke="var(--color-accent-primary)" strokeWidth="1"
              strokeDasharray="8 16" opacity="0.2" />
          </svg>
          {/* Orbiting dot */}
          <div className="absolute w-3 h-3 rounded-full animate-pulse-glow"
            style={{
              top: '50%', left: '50%',
              marginTop: -220, marginLeft: -6,
              backgroundColor: 'var(--color-accent-primary)',
            }} />
        </motion.div>
      </div>

      <motion.div ref={ref as React.RefObject<HTMLDivElement>} className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-semibold glass border"
            style={{ borderColor: 'var(--color-accent-primary)', color: 'var(--color-accent-primary-dark)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ backgroundColor: 'var(--color-accent-primary)' }} />
            Cloud Cost Intelligence Platform
            <span className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: 'var(--color-accent-primary)', color: 'var(--color-text-inverse)' }}>
              New
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <div className="text-center mb-6">
          {'Know exactly where your'.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
              className="fluid-hero font-black inline-block mr-3"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            className="fluid-hero font-black gradient-text inline-block mr-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            cloud spend
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
            className="fluid-hero font-black inline-block"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
          >
            goes.
          </motion.span>
        </div>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.75 }}
          className="fluid-body text-center max-w-2xl mx-auto mb-10"
          style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}
        >
          Per-cluster, per-namespace, per-pod cost visibility across AWS, Azure, and GCP —
          with efficiency scores that actually save you money.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={() => onNavigate('platform')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-base font-bold cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-primary-dark))',
              color: 'var(--color-text-inverse)',
              fontFamily: 'var(--font-display)',
              boxShadow: 'var(--shadow-glow)',
            }}
            whileHover={{ scale: 1.06, boxShadow: '0 0 55px rgba(61,220,132,0.6)' }}
            whileTap={{ scale: 0.97 }}
          >
            Start for free
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          <motion.button
            onClick={() => onNavigate('platform')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-base font-semibold cursor-pointer border"
            style={{
              borderColor: 'var(--color-border-default)',
              color: 'var(--color-text-secondary)',
              backgroundColor: 'var(--color-bg-card)',
              fontFamily: 'var(--font-display)',
            }}
            whileHover={{ scale: 1.04, borderColor: 'var(--color-accent-primary)', color: 'var(--color-accent-primary-dark)' }}
            whileTap={{ scale: 0.97 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 6.5L12 9l-5 2.5V6.5z" fill="currentColor"/>
            </svg>
            Watch demo
          </motion.button>
        </motion.div>

        {/* 2-col: stats + mini-dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Stats */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <StatCard value={2400000} label="Monthly Savings" suffix="" delay={0.9} />
            <StatCard value={99.9} label="Uptime SLA" prefix="" suffix="%" delay={1.0} />
            <StatCard value={340} label="Active Clusters" prefix="" suffix="+" delay={1.1} />
            <StatCard value={12} label="Avg Cost Reduction" prefix="" suffix="%" delay={1.2} />
          </div>

          {/* Mini dashboard preview */}
          <div className="lg:col-span-3">
            <MiniDashCard />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Scroll to explore</span>
        <motion.div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
          style={{ borderColor: 'var(--color-border-default)' }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--color-accent-primary)' }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
