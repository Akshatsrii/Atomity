// App.tsx
import React, { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { ResourceIconsSection } from './components/ResourceIconsSection'
import { CloudProvidersSection } from './components/CloudProvidersSection'
import { CostExplorer } from './components/CostExplorer'
import { PlatformPage } from './pages/PlatformPage'
import { PricingPage } from './pages/PricingPage'
import { DocsPage } from './pages/DocsPage'
import { BlogPage } from './pages/BlogPage'
import { useClusterData } from './hooks/useClusterData'
import { useInView } from './hooks/useInView'

const queryClient = new QueryClient()

function ExplorerSection({ onNavigate }: { onNavigate: (p: string) => void }) {
  const { data: clusters = [], isLoading, isError } = useClusterData()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.04, once: true })

  return (
    <section id="explorer" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-10 text-center"
        >
          <h2 className="fluid-h2 font-black mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
            Drill into every layer of cost
          </h2>
          <p className="fluid-body max-w-lg mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Click any block to zoom from Cluster → Namespace → Pod.
            Data is live-fetched and cached for instant revisits.
          </p>
        </motion.div>
        <CostExplorer clusters={clusters} isLoading={isLoading} isError={isError} />
      </div>
    </section>
  )
}

// CTA Section
function CTASection({ onNavigate }: { onNavigate: (p: string) => void }) {
  const { ref, inView } = useInView({ threshold: 0.2 })
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative rounded-3xl p-12 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--color-accent-primary-dark) 0%, var(--color-accent-primary) 50%, var(--color-accent-primary-light) 100%)',
            boxShadow: 'var(--shadow-glow), var(--shadow-elevated)',
          }}
        >
          {/* Animated bg circles */}
          {[120, 200, 280].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: size, height: size,
                border: '1px solid rgba(255,255,255,0.15)',
                top: '50%', left: '50%',
                marginTop: -size / 2, marginLeft: -size / 2,
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
            />
          ))}

          <div className="relative z-10">
            <h2 className="fluid-h2 font-black text-white mb-4"
              style={{ fontFamily: 'var(--font-display)' }}>
              Start saving today.
            </h2>
            <p className="text-base text-white/75 mb-8">
              Connect your first cluster in 5 minutes. No credit card required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                onClick={() => onNavigate('pricing')}
                className="px-8 py-3.5 rounded-2xl text-sm font-bold cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  color: 'var(--color-accent-primary-dark)',
                  fontFamily: 'var(--font-display)',
                }}
                whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                View pricing
              </motion.button>
              <motion.button
                onClick={() => onNavigate('docs')}
                className="px-8 py-3.5 rounded-2xl text-sm font-bold cursor-pointer border border-white/30 text-white"
                style={{ fontFamily: 'var(--font-display)' }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.97 }}
              >
                Read the docs
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Home page
function HomePage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <main>
      <HeroSection onNavigate={onNavigate} />
      <ResourceIconsSection />
      <CloudProvidersSection />
      <ExplorerSection onNavigate={onNavigate} />
      <CTASection onNavigate={onNavigate} />
    </main>
  )
}

const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.25 } },
}

function AppInner() {
  const [page, setPage] = useState('home')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mq.matches)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const renderPage = () => {
    switch (page) {
      case 'platform': return <PlatformPage />
      case 'pricing':  return <PricingPage />
      case 'docs':     return <DocsPage />
      case 'blog':     return <BlogPage />
      default:         return <HomePage onNavigate={setPage} />
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh' }}>
      <Navbar
        activePage={page}
        onNavigate={setPage}
        isDark={isDark}
        onToggleTheme={() => setIsDark(d => !d)}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          variants={PAGE_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <footer className="py-10 px-4 border-t" style={{ borderColor: 'var(--color-border-default)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-accent-primary)' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="2.5" fill="#0d1f1a"/>
                <circle cx="2" cy="3" r="1.2" fill="#0d1f1a" opacity="0.7"/>
                <circle cx="10" cy="3" r="1.2" fill="#0d1f1a" opacity="0.7"/>
                <circle cx="2" cy="9" r="1.2" fill="#0d1f1a" opacity="0.7"/>
                <circle cx="10" cy="9" r="1.2" fill="#0d1f1a" opacity="0.7"/>
              </svg>
            </div>
            <span className="font-black text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              atomity
            </span>
          </div>
          <div className="flex gap-6">
            {['Platform', 'Pricing', 'Docs', 'Blog'].map(l => (
              <button key={l} onClick={() => setPage(l.toLowerCase())}
                className="text-xs cursor-pointer hover:text-[var(--color-accent-primary)] transition-colors"
                style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
                {l}
              </button>
            ))}
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © 2026 Atomity · Built for the Frontend Challenge
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  )
}
