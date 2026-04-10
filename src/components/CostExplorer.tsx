import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CostNode, BreadcrumbItem, DrillLevel } from '../types'
import { AnimatedBubble } from './AnimatedBubble'
import { CostTableRow } from './CostTableRow'
import { Breadcrumb } from './Breadcrumb'
import { LoadingSkeleton } from './LoadingSkeleton'
import { useInView } from '../hooks/useInView'

interface CostExplorerProps {
  clusters: CostNode[]
  isLoading: boolean
  isError: boolean
}

const TABLE_HEADERS = ['CPU', 'RAM', 'Storage', 'Network', 'GPU', 'Efficiency', 'Total']

export function CostExplorer({ clusters, isLoading, isError }: CostExplorerProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.03, once: true })
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([{ label: 'Cluster', level: 'cluster' }])
  const [selectedClusterIdx, setSelectedClusterIdx] = useState<number | null>(null)
  const [selectedNsIdx, setSelectedNsIdx] = useState<number | null>(null)

  const currentLevel: DrillLevel = breadcrumbs[breadcrumbs.length - 1]?.level ?? 'cluster'

  const displayNodes: CostNode[] = (() => {
    if (currentLevel === 'cluster') return clusters
    if (currentLevel === 'namespace' && selectedClusterIdx !== null)
      return clusters[selectedClusterIdx]?.children ?? []
    if (currentLevel === 'pod' && selectedClusterIdx !== null && selectedNsIdx !== null)
      return clusters[selectedClusterIdx]?.children?.[selectedNsIdx]?.children ?? []
    return []
  })()

  const maxTotal = Math.max(...displayNodes.map(n => n.total), 1)

  const handleBubbleClick = useCallback((index: number) => {
    if (currentLevel === 'cluster') {
      const node = clusters[index]
      if (!node?.children?.length) return
      setSelectedClusterIdx(index)
      setBreadcrumbs([
        { label: 'Cluster', level: 'cluster' },
        { label: `${node.name} - Namespace`, level: 'namespace', nodeId: node.id },
      ])
    } else if (currentLevel === 'namespace' && selectedClusterIdx !== null) {
      const node = clusters[selectedClusterIdx]?.children?.[index]
      if (!node?.children?.length) return
      setSelectedNsIdx(index)
      setBreadcrumbs(prev => [
        ...prev.slice(0, 2),
        { label: `${node.name} - Pods`, level: 'pod', nodeId: node.id },
      ])
    }
  }, [currentLevel, clusters, selectedClusterIdx])

  const handleNavigate = useCallback((crumbIndex: number) => {
    if (crumbIndex === 0) {
      setBreadcrumbs([{ label: 'Cluster', level: 'cluster' }])
      setSelectedClusterIdx(null)
      setSelectedNsIdx(null)
    } else if (crumbIndex === 1) {
      setBreadcrumbs(prev => prev.slice(0, 2))
      setSelectedNsIdx(null)
    }
  }, [])

  const isClickable = currentLevel !== 'pod'

  return (
    <section
      ref={ref}
      aria-label="Cloud Cost Explorer"
      className="relative rounded-3xl overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        boxShadow: 'var(--shadow-elevated)',
        border: '1px solid var(--color-border-default)',
      }}
    >
      {/* Top glow strip */}
      <div className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent-primary), transparent)' }} />

      {isLoading && <LoadingSkeleton />}

      {isError && (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <motion.span
            className="text-5xl"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: 3 }}
          >⚠️</motion.span>
          <p className="font-bold text-lg" style={{ color: 'var(--color-accent-error)' }}>Failed to load cost data</p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Check your connection and try again.</p>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="p-5 md:p-8 space-y-0">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <Breadcrumb items={breadcrumbs} onNavigate={handleNavigate} period="Last 30 Days" />
            {isClickable && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-accent-primary) 10%, transparent)',
                  color: 'var(--color-accent-primary-dark)',
                  border: '1px dashed var(--color-accent-primary)',
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M3.5 5l1.5 1.5L8 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Click a block to drill down
              </motion.span>
            )}
          </div>

          {/* Chart area with grid */}
          <div className="relative mb-2">
            <div className="absolute inset-0 pointer-events-none">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} className="absolute w-full"
                  style={{ top: `${i * (100 / 5)}%`, borderTop: '1px dashed var(--color-grid-line)' }} />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentLevel}-${selectedClusterIdx}-${selectedNsIdx}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="flex items-end gap-4 md:gap-7 overflow-x-auto pb-4"
                style={{ minHeight: 290, paddingTop: 20 }}
              >
                {displayNodes.map((node, i) => (
                  <AnimatedBubble
                    key={node.id}
                    node={node}
                    maxTotal={maxTotal}
                    isClickable={isClickable && !!node.children?.length}
                    index={i}
                    inView={inView}
                    onClick={() => handleBubbleClick(i)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="mb-0" style={{ borderTop: '1px dashed var(--color-grid-line)' }} />

          {/* Table */}
          <div className="overflow-x-auto rounded-xl">
            <AnimatePresence mode="wait">
              <motion.table
                key={`${currentLevel}-${selectedClusterIdx}-${selectedNsIdx}-tbl`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full border-collapse"
                style={{ minWidth: 580 }}
              >
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-6 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--color-text-muted)' }} />
                    {TABLE_HEADERS.map(h => (
                      <th key={h} className="py-3.5 px-3 text-xs font-bold text-right uppercase tracking-wider"
                        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayNodes.map((node, i) => (
                    <CostTableRow
                      key={node.id}
                      node={node}
                      isFirst={i === 0}
                      index={i}
                      inView={inView}
                      isSelected={false}
                      onClick={isClickable && node.children?.length ? () => handleBubbleClick(i) : undefined}
                    />
                  ))}
                </tbody>
              </motion.table>
            </AnimatePresence>
          </div>
        </div>
      )}
    </section>
  )
}
