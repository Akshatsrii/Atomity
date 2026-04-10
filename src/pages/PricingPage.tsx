// pages/PricingPage.tsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const PLANS = [
  {
    name: 'Starter',
    monthly: 0,
    annual: 0,
    desc: 'Perfect for small teams getting started with cost visibility.',
    features: ['Up to 3 clusters', '30-day data retention', 'Cluster-level breakdown', 'Email alerts', 'Community support'],
    cta: 'Start free',
    highlight: false,
    accent: 'var(--color-accent-blue)',
  },
  {
    name: 'Growth',
    monthly: 299,
    annual: 249,
    desc: 'For engineering teams that want deep pod-level cost attribution.',
    features: ['Up to 20 clusters', '90-day retention', 'Namespace & Pod drill-down', 'Slack + PagerDuty alerts', 'Anomaly detection', 'Rightsizing recommendations', 'Priority support'],
    cta: 'Start 14-day trial',
    highlight: true,
    accent: 'var(--color-accent-primary)',
  },
  {
    name: 'Enterprise',
    monthly: null,
    annual: null,
    desc: 'Custom contracts for large-scale multi-cloud deployments.',
    features: ['Unlimited clusters', '1-year+ retention', 'Custom allocation rules', 'SSO & RBAC', 'Dedicated CSM', 'SLA guarantee', 'On-prem option'],
    cta: 'Contact sales',
    highlight: false,
    accent: 'var(--color-accent-purple)',
  },
]

function PricingCard({ plan, annual, delay }: { plan: typeof PLANS[0]; annual: boolean; delay: number }) {
  const { ref, inView } = useInView({ threshold: 0.2 })
  const price = annual ? plan.annual : plan.monthly

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: plan.highlight ? -8 : -4 }}
      className="relative rounded-3xl p-7 flex flex-col gap-5 overflow-hidden"
      style={{
        backgroundColor: plan.highlight ? 'var(--color-text-primary)' : 'var(--color-bg-card)',
        border: plan.highlight ? '2px solid var(--color-accent-primary)' : '1px solid var(--color-border-default)',
        boxShadow: plan.highlight ? 'var(--shadow-glow), var(--shadow-elevated)' : 'var(--shadow-card)',
        transition: 'box-shadow 0.3s, transform 0.3s',
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full -mr-16 -mt-16 pointer-events-none"
        style={{ backgroundColor: `color-mix(in srgb, ${plan.accent} 12%, transparent)` }} />

      {plan.highlight && (
        <div className="absolute top-4 right-4">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: 'var(--color-accent-primary)', color: 'var(--color-text-inverse)' }}>
            Most Popular
          </span>
        </div>
      )}

      <div>
        <h3 className="text-lg font-black mb-1"
          style={{ fontFamily: 'var(--font-display)', color: plan.highlight ? '#fff' : 'var(--color-text-primary)' }}>
          {plan.name}
        </h3>
        <p className="text-sm" style={{ color: plan.highlight ? 'rgba(255,255,255,0.6)' : 'var(--color-text-muted)' }}>
          {plan.desc}
        </p>
      </div>

      <div className="flex items-end gap-1">
        {price === null ? (
          <span className="text-3xl font-black" style={{ fontFamily: 'var(--font-display)', color: plan.highlight ? '#fff' : 'var(--color-text-primary)' }}>
            Custom
          </span>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.span
                key={annual ? 'annual' : 'monthly'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="text-4xl font-black tabular-nums"
                style={{ fontFamily: 'var(--font-display)', color: plan.highlight ? '#fff' : 'var(--color-text-primary)' }}
              >
                ${price}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm mb-1.5" style={{ color: plan.highlight ? 'rgba(255,255,255,0.55)' : 'var(--color-text-muted)' }}>
              /mo
            </span>
          </>
        )}
      </div>

      <ul className="flex flex-col gap-2.5 flex-1">
        {plan.features.map(f => (
          <li key={f} className="flex items-center gap-2.5 text-sm"
            style={{ color: plan.highlight ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)' }}>
            <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `color-mix(in srgb, ${plan.accent} 18%, transparent)` }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 4l2 2L6.5 2" stroke={plan.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {f}
          </li>
        ))}
      </ul>

      <motion.button
        className="w-full py-3 rounded-2xl text-sm font-bold cursor-pointer"
        style={{
          backgroundColor: plan.highlight ? 'var(--color-accent-primary)' : 'transparent',
          border: plan.highlight ? 'none' : `1.5px solid ${plan.accent}`,
          color: plan.highlight ? 'var(--color-text-inverse)' : plan.accent,
          fontFamily: 'var(--font-display)',
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {plan.cta}
      </motion.button>
    </motion.div>
  )
}

export function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ borderColor: 'var(--color-accent-primary)', backgroundColor: 'color-mix(in srgb, var(--color-accent-primary) 10%, transparent)', color: 'var(--color-accent-primary-dark)' }}
        >
          ✦ Simple, transparent pricing
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, ease: [0.34, 1.56, 0.64, 1] }}
          className="fluid-h2 font-black mb-4"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          Pay for what you save, not what you spend
        </motion.h1>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}
          className="inline-flex items-center gap-3 mt-6 p-1 rounded-2xl"
          style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border-default)' }}
        >
          {['Monthly', 'Annual'].map(opt => (
            <button
              key={opt}
              onClick={() => setAnnual(opt === 'Annual')}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer relative"
              style={{
                backgroundColor: (opt === 'Annual') === annual ? 'var(--color-accent-primary)' : 'transparent',
                color: (opt === 'Annual') === annual ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {opt}
              {opt === 'Annual' && (
                <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: annual ? 'rgba(255,255,255,0.25)' : 'color-mix(in srgb, var(--color-accent-primary) 15%, transparent)', color: annual ? '#fff' : 'var(--color-accent-primary-dark)' }}>
                  −17%
                </span>
              )}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan, i) => (
          <PricingCard key={plan.name} plan={plan} annual={annual} delay={i * 0.1} />
        ))}
      </div>

      {/* FAQ teaser */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center"
      >
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Questions about pricing?{' '}
          <span className="font-semibold cursor-pointer" style={{ color: 'var(--color-accent-primary-dark)' }}>
            Talk to our team →
          </span>
        </p>
      </motion.div>
    </div>
  )
}
