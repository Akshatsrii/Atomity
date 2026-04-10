// components/CostTableRow.tsx
import React from 'react'
import { motion } from 'framer-motion'
import type { CostNode } from '../types'
import { useCountUp } from '../hooks/useCountUp'

interface CostTableRowProps {
  node: CostNode
  isFirst: boolean
  index: number
  inView: boolean
  isSelected: boolean
  onClick?: () => void
}

function AnimatedCell({ value, inView, delay }: { value: number; inView: boolean; delay: number }) {
  const fmt = useCountUp({ end: value, prefix: '$', enabled: inView, duration: 800 + delay * 80 })
  return <span className="tabular-nums">{fmt}</span>
}

export function CostTableRow({ node, isFirst, index, inView, isSelected, onClick }: CostTableRowProps) {
  const effColor = node.costs.efficiency < 20
    ? 'var(--color-accent-error)'
    : node.costs.efficiency < 35
    ? 'var(--color-accent-warning)'
    : 'var(--color-accent-success)'

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.45, delay: 0.35 + index * 0.07, ease: 'easeOut' }}
      onClick={onClick}
      whileHover={onClick ? { backgroundColor: 'color-mix(in srgb, var(--color-accent-primary) 5%, transparent)' } : {}}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: isSelected ? 'color-mix(in srgb, var(--color-accent-primary) 7%, transparent)' : undefined,
        borderRadius: 12,
      }}
    >
      <td className="py-3.5 pl-4 pr-6 text-sm font-bold rounded-l-xl"
        style={{ fontFamily: 'var(--font-display)', color: isFirst ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
        {node.name}
      </td>
      {[node.costs.cpu, node.costs.ram, node.costs.storage, node.costs.network, node.costs.gpu].map((val, i) => (
        <td key={i} className="py-3.5 px-3 text-sm text-right"
          style={{ color: isFirst ? 'var(--color-text-secondary)' : 'var(--color-text-muted)' }}>
          {val === 0 ? <span style={{ color: 'var(--color-text-muted)' }}>—</span>
            : <AnimatedCell value={val} inView={inView} delay={i} />}
        </td>
      ))}
      <td className="py-3.5 px-3 text-sm text-right font-bold">
        <span className="px-2 py-0.5 rounded-full text-xs"
          style={{ backgroundColor: `color-mix(in srgb, ${effColor} 12%, transparent)`, color: effColor }}>
          {node.costs.efficiency}%
        </span>
      </td>
      <td className="py-3.5 pl-3 pr-4 text-sm font-black text-right rounded-r-xl"
        style={{ fontFamily: 'var(--font-display)', color: isFirst ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
        <AnimatedCell value={node.total} inView={inView} delay={5} />
      </td>
    </motion.tr>
  )
}
