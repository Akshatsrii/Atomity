// pages/PlatformPage.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { ResourceIcon } from '../components/ResourceIcon'
import type { ResourceType } from '../types'

function FeatureCard({ icon, title, desc, accent, delay }: {
  icon: React.ReactNode; title: string; desc: string; accent: string; delay: number
}) {
  const { ref, inView } = useInView({ threshold: 0.2 })
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -6, boxShadow: 'var(--shadow-glow), var(--shadow-elevated)' }}
      className="relative rounded-3xl p-6 overflow-hidden flex flex-col gap-4 cursor-default"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border-default)',
        boxShadow: 'var(--shadow-card)',
        transition: 'box-shadow 0.3s, transform 0.3s',
      }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-10 -mt-10 pointer-events-none"
        style={{ backgroundColor: `color-mix(in srgb, ${accent} 8%, transparent)` }} />
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: `color-mix(in srgb, ${accent} 15%, transparent)`, color: accent }}>
        {icon}
      </div>
      <div>
        <h3 className="text-base font-black mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
      </div>
    </motion.div>
  )
}

function IntegrationBadge({ name, color, delay }: { name: string; color: string; delay: number }) {
  const { ref, inView } = useInView({ threshold: 0.3 })
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.08, y: -3 }}
      className="px-4 py-2.5 rounded-2xl text-sm font-bold border cursor-default"
      style={{
        backgroundColor: `color-mix(in srgb, ${color} 10%, transparent)`,
        borderColor: `color-mix(in srgb, ${color} 30%, transparent)`,
        color,
      }}
    >
      {name}
    </motion.div>
  )
}

// Animated workflow viz
function WorkflowViz() {
  const { ref, inView } = useInView({ threshold: 0.2 })
  const steps = ['Ingest', 'Analyze', 'Allocate', 'Optimize', 'Report']
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="flex items-center gap-2 flex-wrap justify-center">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
            className="flex flex-col items-center gap-1.5"
          >
            <motion.div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm"
              style={{
                background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-primary-dark))',
                color: 'var(--color-text-inverse)',
                fontFamily: 'var(--font-display)',
                boxShadow: 'var(--shadow-glow-sm)',
              }}
              animate={inView ? { boxShadow: ['var(--shadow-glow-sm)', 'var(--shadow-glow)', 'var(--shadow-glow-sm)'] } : {}}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            >
              {i + 1}
            </motion.div>
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>{step}</span>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.12 + 0.3 }}
              className="flex-1 h-0.5 min-w-6 max-w-10 rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--color-accent-primary), var(--color-accent-primary-light))', transformOrigin: 'left' }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

const FEATURES = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M11 7v4l3 3"/></svg>,
    title: 'Real-time Cost Tracking',
    desc: 'Sub-minute cost granularity for every pod, namespace, and node in your cluster. No guesswork.',
    accent: 'var(--color-accent-primary)',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 20 6 14 10 17 14 10 18 13 22 4"/></svg>,
    title: 'Efficiency Scoring',
    desc: 'Proprietary efficiency index measures CPU, RAM, and GPU utilization against what you\'re paying.',
    accent: 'var(--color-accent-blue)',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h14M4 12h14M4 17h8"/></svg>,
    title: 'Multi-cloud Allocation',
    desc: 'Unified view across AWS, Azure, and GCP. Allocate costs by team, service, or environment.',
    accent: 'var(--color-accent-purple)',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7H4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3v4M8 3v4"/></svg>,
    title: 'Budget Alerts',
    desc: 'Set spend thresholds per namespace or label. Get Slack/PagerDuty alerts before you overspend.',
    accent: 'var(--color-accent-warning)',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M11 8v3l2 2"/><path d="M7.5 4.5L5 2M14.5 4.5L17 2"/></svg>,
    title: 'Anomaly Detection',
    desc: 'ML-powered anomaly detection surfaces unexpected cost spikes before your monthly bill does.',
    accent: 'var(--color-accent-error)',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="12" y="3" width="7" height="7" rx="1"/><rect x="3" y="12" width="7" height="7" rx="1"/><rect x="12" y="12" width="7" height="7" rx="1"/></svg>,
    title: 'Rightsizing Recommendations',
    desc: 'Automated pod rightsizing suggestions backed by 90-day utilization history and ML models.',
    accent: 'var(--color-accent-success)',
  },
]

export function PlatformPage() {
  const { ref: heroRef, inView: heroIn } = useInView({ threshold: 0.1 })
  const { ref: integRef, inView: integIn } = useInView({ threshold: 0.2 })

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Hero */}
      <div ref={heroRef as React.RefObject<HTMLDivElement>} className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={heroIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ borderColor: 'var(--color-accent-primary)', backgroundColor: 'color-mix(in srgb, var(--color-accent-primary) 10%, transparent)', color: 'var(--color-accent-primary-dark)' }}
        >
          ✦ Platform Overview
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={heroIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.34, 1.56, 0.64, 1] }}
          className="fluid-h2 font-black mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Everything you need to{' '}
          <span className="gradient-text">own your cloud costs</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={heroIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fluid-body max-w-2xl mx-auto"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Atomity connects to your Kubernetes clusters in minutes and starts delivering
          actionable cost insights immediately — no agents, no YAML changes.
        </motion.p>
      </div>

      {/* Workflow */}
      <div className="mb-16 p-8 rounded-3xl"
        style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-default)', boxShadow: 'var(--shadow-card)' }}>
        <p className="text-xs font-bold uppercase tracking-widest text-center mb-8"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}>
          How it works
        </p>
        <WorkflowViz />
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} {...f} delay={i * 0.07} />
        ))}
      </div>

      {/* Integrations */}
      <div ref={integRef as React.RefObject<HTMLDivElement>} className="text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={integIn ? { opacity: 1 } : {}}
          className="text-xs font-bold uppercase tracking-widest mb-6"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}
        >
          Integrates with your stack
        </motion.p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { name: 'AWS EKS', color: '#FF9900' },
            { name: 'Azure AKS', color: '#0078D4' },
            { name: 'GKE', color: '#4285F4' },
            { name: 'Prometheus', color: '#E6522C' },
            { name: 'Grafana', color: '#F46800' },
            { name: 'Datadog', color: '#632CA6' },
            { name: 'Slack', color: '#4A154B' },
            { name: 'PagerDuty', color: '#06AC38' },
            { name: 'Terraform', color: '#7B42BC' },
            { name: 'ArgoCD', color: '#EF7B4D' },
          ].map((integ, i) => (
            <IntegrationBadge key={integ.name} {...integ} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </div>
  )
}
