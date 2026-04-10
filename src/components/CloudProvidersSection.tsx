// components/CloudProvidersSection.tsx
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

function AWSLogo() {
  return (
    <svg viewBox="0 0 90 36" width="90" height="36" fill="none">
      <text x="0" y="27" fontSize="26" fontWeight="900" fontFamily="'DM Sans',sans-serif" fill="var(--color-text-primary)">aws</text>
      <path d="M42 32 Q56 37 70 32" stroke="#FF9900" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

function AzureLogo() {
  return (
    <svg viewBox="0 0 100 36" width="100" height="36" fill="none">
      <polygon points="14,4 0,32 9,32 23,9" fill="#0078D4"/>
      <polygon points="14,4 28,32 37,32 23,9" fill="#0078D4" opacity="0.7"/>
      <text x="42" y="27" fontSize="19" fontWeight="700" fontFamily="'DM Sans',sans-serif" fill="#0078D4">Azure</text>
    </svg>
  )
}

function GCPLogo() {
  return (
    <svg viewBox="0 0 150 40" width="150" height="40" fill="none">
      <circle cx="20" cy="22" r="9" fill="#4285F4"/>
      <circle cx="30" cy="17" r="8" fill="#EA4335"/>
      <circle cx="40" cy="22" r="9" fill="#FBBC05"/>
      <circle cx="30" cy="27" r="8" fill="#34A853"/>
      <text x="56" y="29" fontSize="17" fontWeight="700" fontFamily="'DM Sans',sans-serif" fill="var(--color-text-secondary)">Google Cloud</text>
    </svg>
  )
}

export function CloudProvidersSection() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2, once: true })

  return (
    <section ref={ref} aria-label="Supported cloud providers" className="py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-xs font-bold uppercase tracking-widest text-center mb-8"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}
        >
          Works with every major cloud provider
        </motion.p>

        <div className="relative flex items-center justify-center">
          {/* Animated price tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20, y: -20, x: 100 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: -12, y: -40, x: 140 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute z-10 pointer-events-none"
            style={{ top: 0, right: '10%' }}
          >
            <div className="relative px-5 py-3 rounded-2xl text-xl font-black"
              style={{
                background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-primary-dark))',
                color: 'var(--color-text-inverse)',
                fontFamily: 'var(--font-display)',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              $$$
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2"
                style={{ borderColor: 'var(--color-accent-primary-dark)', backgroundColor: 'var(--color-bg-card)' }} />
            </div>
          </motion.div>

          {/* Provider card */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-2xl"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 px-10 py-8 rounded-3xl"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-default)',
                boxShadow: 'var(--shadow-elevated)',
              }}
            >
              {[
                { Logo: AWSLogo, delay: 0.25, name: 'Amazon Web Services' },
                { Logo: AzureLogo, delay: 0.38, name: 'Microsoft Azure' },
                { Logo: GCPLogo, delay: 0.5, name: 'Google Cloud Platform' },
              ].map(({ Logo, delay, name }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay }}
                  whileHover={{ scale: 1.07, y: -3 }}
                  className="flex flex-col items-center gap-2"
                >
                  <Logo />
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent-primary)' }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
