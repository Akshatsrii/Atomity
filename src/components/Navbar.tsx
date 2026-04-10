// components/Navbar.tsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'

interface NavbarProps {
  activePage: string
  onNavigate: (page: string) => void
  isDark: boolean
  onToggleTheme: () => void
}

const NAV_LINKS = ['Platform', 'Pricing', 'Docs', 'Blog']

export function Navbar({ activePage, onNavigate, isDark, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled
            ? 'var(--color-bg-glass)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border-default)' : 'none',
          boxShadow: scrolled ? 'var(--shadow-card)' : 'none',
        }}
      >
        <nav
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between"
        >
          {/* Logo */}
          <motion.button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              className="w-8 h-8 rounded-xl flex items-center justify-center relative"
              style={{ backgroundColor: 'var(--color-accent-primary)' }}
              animate={{ boxShadow: ['0 0 0px rgba(61,220,132,0)', '0 0 18px rgba(61,220,132,0.6)', '0 0 0px rgba(61,220,132,0)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="3.5" fill="#0d1f1a"/>
                <circle cx="3.5" cy="4" r="1.8" fill="#0d1f1a" opacity="0.7"/>
                <circle cx="14.5" cy="4" r="1.8" fill="#0d1f1a" opacity="0.7"/>
                <circle cx="3.5" cy="14" r="1.8" fill="#0d1f1a" opacity="0.7"/>
                <circle cx="14.5" cy="14" r="1.8" fill="#0d1f1a" opacity="0.7"/>
              </svg>
            </motion.div>
            <span
              className="text-xl font-black tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
            >
              atomity
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activePage === link.toLowerCase()
              return (
                <motion.button
                  key={link}
                  onClick={() => onNavigate(link.toLowerCase())}
                  className="relative px-4 py-2 text-sm font-medium rounded-xl transition-colors cursor-pointer"
                  style={{
                    color: isActive ? 'var(--color-accent-primary-dark)' : 'var(--color-text-muted)',
                    backgroundColor: isActive ? 'color-mix(in srgb, var(--color-accent-primary) 10%, transparent)' : 'transparent',
                    fontFamily: 'var(--font-body)',
                  }}
                  whileHover={{ color: 'var(--color-accent-primary-dark)', scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-accent-primary)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <motion.button
              onClick={() => onNavigate('platform')}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-primary-dark))',
                color: 'var(--color-text-inverse)',
                fontFamily: 'var(--font-display)',
                boxShadow: 'var(--shadow-glow-sm)',
              }}
              whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-glow)' }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>

            {/* Mobile burger */}
            <motion.button
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded-lg"
              style={{ backgroundColor: 'var(--color-bg-secondary)' }}
              onClick={() => setMobileOpen(o => !o)}
              whileTap={{ scale: 0.93 }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="block h-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-text-primary)', width: i === 1 ? 14 : 18 }}
                  animate={mobileOpen ? {
                    rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                    y: i === 0 ? 8 : i === 2 ? -8 : 0,
                    opacity: i === 1 ? 0 : 1,
                    width: 18,
                  } : { rotate: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                />
              ))}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b"
            style={{ borderColor: 'var(--color-border-default)' }}
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => { onNavigate(link.toLowerCase()); setMobileOpen(false) }}
                  className="w-full text-left px-4 py-3 text-sm font-semibold rounded-xl cursor-pointer"
                  style={{
                    color: activePage === link.toLowerCase() ? 'var(--color-accent-primary-dark)' : 'var(--color-text-secondary)',
                    backgroundColor: activePage === link.toLowerCase() ? 'color-mix(in srgb, var(--color-accent-primary) 10%, transparent)' : 'transparent',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {link}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
