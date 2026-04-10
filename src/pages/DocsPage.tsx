// pages/DocsPage.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const DOC_SECTIONS = [
  {
    category: 'Getting Started',
    icon: '🚀',
    articles: [
      { title: 'Quick Start (5 min)', desc: 'Connect your first cluster in under 5 minutes.', badge: 'Start here', time: '5 min' },
      { title: 'Install the Atomity Agent', desc: 'kubectl-based agent installation, zero privileges needed.', time: '10 min' },
      { title: 'Multi-cluster Setup', desc: 'Add multiple clusters and configure workspace grouping.', time: '15 min' },
    ],
  },
  {
    category: 'Cost Explorer',
    icon: '💰',
    articles: [
      { title: 'Understanding the Drill-Down', desc: 'Navigate from cluster to namespace to pod costs.', time: '5 min' },
      { title: 'Efficiency Score Explained', desc: 'How we calculate efficiency and what it means for your team.', time: '8 min' },
      { title: 'Custom Cost Allocation', desc: 'Split shared infrastructure costs across teams with labels.', time: '12 min' },
    ],
  },
  {
    category: 'Integrations',
    icon: '🔌',
    articles: [
      { title: 'AWS EKS Integration', desc: 'Connect EKS clusters and pull billing data from CUR.', time: '10 min' },
      { title: 'Azure AKS Integration', desc: 'Azure Cost Management integration setup guide.', time: '10 min' },
      { title: 'Slack & PagerDuty Alerts', desc: 'Configure budget alerts to fire into your ops channels.', time: '7 min' },
    ],
  },
  {
    category: 'API Reference',
    icon: '⚙️',
    articles: [
      { title: 'REST API Overview', desc: 'Authentication, rate limits, and response formats.', badge: 'v2', time: '5 min' },
      { title: 'Cost Data Endpoints', desc: 'Query cluster, namespace, and pod-level cost data programmatically.', time: '15 min' },
      { title: 'Webhooks', desc: 'Subscribe to budget breach and anomaly events via webhooks.', time: '10 min' },
    ],
  },
]

function DocCard({ article, delay }: { article: { title: string; desc: string; badge?: string; time: string }; delay: number }) {
  const { ref, inView } = useInView({ threshold: 0.2 })
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, x: -18 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay }}
      whileHover={{ x: 4, backgroundColor: 'var(--color-bg-card-hover)' }}
      className="flex items-start gap-4 p-4 rounded-2xl cursor-pointer group"
      style={{ border: '1px solid var(--color-border-default)', backgroundColor: 'var(--color-bg-card)', transition: 'all 0.2s' }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
            {article.title}
          </span>
          {article.badge && (
            <span className="px-1.5 py-0.5 rounded text-xs font-bold"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent-primary) 15%, transparent)', color: 'var(--color-accent-primary-dark)' }}>
              {article.badge}
            </span>
          )}
        </div>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{article.desc}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{article.time}</span>
        <motion.svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          animate={{ x: 0 }}
          whileHover={{ x: 3 }}
        >
          <path d="M3 7h8M8 4l3 3-3 3" stroke="var(--color-accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </div>
    </motion.div>
  )
}

// Terminal animation
function TerminalBlock() {
  const { ref, inView } = useInView({ threshold: 0.3 })
  const lines = [
    { text: '$ kubectl apply -f atomity-agent.yaml', color: 'var(--color-accent-primary)', delay: 0.2 },
    { text: 'namespace/atomity-system created', color: 'var(--color-text-secondary)', delay: 0.8 },
    { text: 'deployment.apps/atomity-agent created', color: 'var(--color-text-secondary)', delay: 1.1 },
    { text: 'serviceaccount/atomity created', color: 'var(--color-text-secondary)', delay: 1.4 },
    { text: '✓ Agent connected. Cluster: prod-us-east-1', color: 'var(--color-accent-success)', delay: 2.0 },
    { text: '✓ Cost data streaming — 42 namespaces found', color: 'var(--color-accent-success)', delay: 2.4 },
  ]

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="rounded-2xl p-5 font-mono text-xs overflow-hidden"
      style={{ backgroundColor: 'var(--color-text-primary)', boxShadow: 'var(--shadow-elevated)' }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 mb-4">
        {['#e8394e', '#f5a623', '#3ddc84'].map((c, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
        ))}
        <span className="ml-2 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>terminal</span>
      </div>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.35, delay: line.delay }}
          className="mb-1.5 leading-relaxed"
          style={{ color: line.color }}
        >
          {line.text}
          {i === lines.length - 1 && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              style={{ color: 'var(--color-accent-primary)' }}
            >
              _
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export function DocsPage() {
  const [search, setSearch] = useState('')
  const { ref, inView } = useInView({ threshold: 0.1 })

  const filtered = DOC_SECTIONS.map(s => ({
    ...s,
    articles: s.articles.filter(a =>
      !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(s => s.articles.length > 0)

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ease: [0.34, 1.56, 0.64, 1] }}
          className="fluid-h2 font-black mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Documentation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="fluid-body mb-8"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Everything you need to get started and go deep.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="relative max-w-md mx-auto"
        >
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="var(--color-text-muted)" strokeWidth="1.5"/>
            <path d="M10.5 10.5l3 3" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search docs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm outline-none"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border-default)',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-body)',
            }}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Doc sections */}
        <div className="lg:col-span-2 space-y-8">
          {filtered.map((section, si) => (
            <div key={section.category}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: si * 0.1 }}
                className="flex items-center gap-2 mb-4"
              >
                <span className="text-lg">{section.icon}</span>
                <h2 className="text-base font-black"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}>
                  {section.category}
                </h2>
              </motion.div>
              <div className="space-y-2">
                {section.articles.map((a, ai) => (
                  <DocCard key={a.title} article={a} delay={si * 0.05 + ai * 0.07} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar: terminal */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}>
              Quick install
            </p>
            <TerminalBlock />
          </div>
        </div>
      </div>
    </div>
  )
}
