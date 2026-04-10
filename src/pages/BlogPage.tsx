// pages/BlogPage.tsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const POSTS = [
  {
    tag: 'Engineering',
    tagColor: 'var(--color-accent-primary)',
    title: 'How We Cut Our Kubernetes Costs by 40% in 30 Days',
    excerpt: 'A deep dive into the rightsizing decisions, namespace optimization, and GPU idle reclamation that saved us $180k/month.',
    author: 'Sara Kim',
    date: 'Apr 3, 2026',
    readTime: '8 min',
    featured: true,
    gradient: 'linear-gradient(135deg, #3ddc84 0%, #19b864 100%)',
  },
  {
    tag: 'Product',
    tagColor: 'var(--color-accent-blue)',
    title: 'Introducing Pod-Level Cost Attribution',
    excerpt: 'Today we\'re launching the deepest level of Kubernetes cost visibility available: per-pod, per-container billing.',
    author: 'Marcus Reed',
    date: 'Mar 28, 2026',
    readTime: '4 min',
    featured: false,
    gradient: 'linear-gradient(135deg, #4f8ef7 0%, #3a6fe0 100%)',
  },
  {
    tag: 'Guide',
    tagColor: 'var(--color-accent-purple)',
    title: 'The FinOps Maturity Model for Kubernetes Teams',
    excerpt: 'From "I have no idea what I\'m paying" to "I can predict next month\'s bill within 2%." Here\'s the roadmap.',
    author: 'Priya Patel',
    date: 'Mar 21, 2026',
    readTime: '12 min',
    featured: false,
    gradient: 'linear-gradient(135deg, #9b6dff 0%, #7346e8 100%)',
  },
  {
    tag: 'Engineering',
    tagColor: 'var(--color-accent-primary)',
    title: 'Namespace Showback vs. Chargeback: When to Use Each',
    excerpt: 'We surveyed 200+ platform engineering teams. Here\'s how they think about internal cloud cost accountability.',
    author: 'Tobias Meier',
    date: 'Mar 14, 2026',
    readTime: '6 min',
    featured: false,
    gradient: 'linear-gradient(135deg, #3ddc84 0%, #4f8ef7 100%)',
  },
  {
    tag: 'Case Study',
    tagColor: 'var(--color-accent-warning)',
    title: 'How Fintech Corp Saved $1.2M Annually Using Atomity',
    excerpt: 'From spreadsheet cost allocation to automated chargeback. A 90-day transformation story.',
    author: 'Atomity Team',
    date: 'Mar 7, 2026',
    readTime: '10 min',
    featured: false,
    gradient: 'linear-gradient(135deg, #f5a623 0%, #e8394e 100%)',
  },
  {
    tag: 'Guide',
    tagColor: 'var(--color-accent-purple)',
    title: 'GPU Cost Optimization: Stop Paying for Idle Compute',
    excerpt: 'GPU hours are expensive. Here\'s how to identify idle GPU pods and reclaim wasted spend automatically.',
    author: 'Sara Kim',
    date: 'Feb 28, 2026',
    readTime: '7 min',
    featured: false,
    gradient: 'linear-gradient(135deg, #9b6dff 0%, #3ddc84 100%)',
  },
]

const TAGS = ['All', 'Engineering', 'Product', 'Guide', 'Case Study']

function PostCard({ post, index, featured }: { post: typeof POSTS[0]; index: number; featured?: boolean }) {
  const { ref, inView } = useInView({ threshold: 0.15 })

  if (featured) {
    return (
      <motion.article
        ref={ref as React.RefObject<HTMLElement>}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ y: -4 }}
        className="col-span-full rounded-3xl overflow-hidden cursor-pointer"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          border: '1px solid var(--color-border-default)',
          boxShadow: 'var(--shadow-elevated)',
          transition: 'box-shadow 0.3s, transform 0.3s',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual */}
          <div className="relative h-52 md:h-auto min-h-48" style={{ background: post.gradient }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-24 h-24 rounded-3xl opacity-25"
                style={{ backgroundColor: 'white' }}
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 0.95, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-16 h-16 rounded-2xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.3)', rotate: 15 }}
                animate={{ rotate: [15, 30, 0, 15] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </div>
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: 'rgba(255,255,255,0.25)', color: '#fff' }}>
                {post.tag}
              </span>
            </div>
          </div>
          {/* Content */}
          <div className="p-7 flex flex-col justify-center gap-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold inline-flex w-fit"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent-primary) 12%, transparent)', color: 'var(--color-accent-primary-dark)' }}>
              Featured
            </span>
            <h2 className="text-xl font-black leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
              {post.title}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{post.excerpt}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: 'var(--color-accent-primary)', color: 'var(--color-text-inverse)' }}>
                {post.author[0]}
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{post.author}</span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>· {post.date} · {post.readTime} read</span>
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      ref={ref as React.RefObject<HTMLElement>}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -5, boxShadow: 'var(--shadow-elevated)' }}
      className="rounded-3xl overflow-hidden cursor-pointer"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        border: '1px solid var(--color-border-default)',
        boxShadow: 'var(--shadow-card)',
        transition: 'box-shadow 0.3s, transform 0.3s',
      }}
    >
      {/* Color top */}
      <div className="h-2 w-full" style={{ background: post.gradient }} />
      <div className="p-5 flex flex-col gap-3">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full w-fit"
          style={{ backgroundColor: `color-mix(in srgb, ${post.tagColor} 12%, transparent)`, color: post.tagColor }}>
          {post.tag}
        </span>
        <h3 className="text-sm font-black leading-snug"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
          {post.title}
        </h3>
        <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--color-text-muted)' }}>{post.excerpt}</p>
        <div className="flex items-center gap-2 pt-1">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: post.tagColor, color: '#fff', fontSize: '0.6rem' }}>
            {post.author[0]}
          </div>
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{post.author} · {post.readTime}</span>
        </div>
      </div>
    </motion.article>
  )
}

export function BlogPage() {
  const [activeTag, setActiveTag] = useState('All')
  const { ref, inView } = useInView({ threshold: 0.1 })

  const filtered = activeTag === 'All' ? POSTS : POSTS.filter(p => p.tag === activeTag)

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ease: [0.34, 1.56, 0.64, 1] }}
          className="fluid-h2 font-black mb-3"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
        >
          The Atomity Blog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="fluid-body mb-8"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Engineering deep dives, product updates, and FinOps best practices.
        </motion.p>

        {/* Tag filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap gap-2"
        >
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all"
              style={{
                backgroundColor: activeTag === tag ? 'var(--color-accent-primary)' : 'var(--color-bg-card)',
                color: activeTag === tag ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
                border: `1px solid ${activeTag === tag ? 'var(--color-accent-primary)' : 'var(--color-border-default)'}`,
                fontFamily: 'var(--font-display)',
              }}
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((post, i) => (
          <PostCard key={post.title} post={post} index={i} featured={post.featured && activeTag === 'All'} />
        ))}
      </div>
    </div>
  )
}
