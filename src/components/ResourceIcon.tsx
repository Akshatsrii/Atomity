// components/ResourceIcon.tsx
import React from 'react'
import type { ResourceType } from '../types'

interface ResourceIconProps {
  type: ResourceType
  size?: number
  className?: string
}

export function ResourceIcon({ type, size = 24, className = '' }: ResourceIconProps) {
  const s = size
  const stroke = 'currentColor'
  const sw = 1.5

  const icons: Record<ResourceType, React.ReactNode> = {
    CPU: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="5" y="5" width="14" height="14" rx="1" />
        <rect x="8" y="8" width="8" height="8" rx="0.5" />
        <line x1="9" y1="2" x2="9" y2="5" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="15" y1="2" x2="15" y2="5" />
        <line x1="9" y1="19" x2="9" y2="22" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="15" y1="19" x2="15" y2="22" />
        <line x1="2" y1="9" x2="5" y2="9" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="2" y1="15" x2="5" y2="15" />
        <line x1="19" y1="9" x2="22" y2="9" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="19" y1="15" x2="22" y2="15" />
      </svg>
    ),
    GPU: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <circle cx="16" cy="12" r="2" />
        <line x1="6" y1="5" x2="6" y2="7" />
        <line x1="9" y1="5" x2="9" y2="7" />
        <line x1="12" y1="5" x2="12" y2="7" />
        <line x1="15" y1="5" x2="15" y2="7" />
        <line x1="18" y1="5" x2="18" y2="7" />
        <line x1="6" y1="17" x2="6" y2="19" />
        <line x1="18" y1="17" x2="18" y2="19" />
      </svg>
    ),
    RAM: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="8" width="20" height="8" rx="1" />
        <rect x="5" y="10" width="2" height="4" rx="0.5" fill={stroke} stroke="none" opacity="0.5"/>
        <rect x="9" y="10" width="2" height="4" rx="0.5" fill={stroke} stroke="none" opacity="0.5"/>
        <rect x="13" y="10" width="2" height="4" rx="0.5" fill={stroke} stroke="none" opacity="0.5"/>
        <rect x="17" y="10" width="2" height="4" rx="0.5" fill={stroke} stroke="none" opacity="0.5"/>
        <line x1="5" y1="6" x2="5" y2="8" />
        <line x1="9" y1="6" x2="9" y2="8" />
        <line x1="13" y1="6" x2="13" y2="8" />
        <line x1="17" y1="6" x2="17" y2="8" />
        <line x1="5" y1="16" x2="5" y2="18" />
        <line x1="19" y1="16" x2="19" y2="18" />
      </svg>
    ),
    Storage: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <ellipse cx="12" cy="6" rx="9" ry="3" />
        <path d="M3 6v4c0 1.657 4.03 3 9 3s9-1.343 9-3V6" />
        <path d="M3 10v4c0 1.657 4.03 3 9 3s9-1.343 9-3v-4" />
        <circle cx="8" cy="6" r="0.5" fill={stroke} stroke="none" />
        <circle cx="8" cy="10" r="0.5" fill={stroke} stroke="none" />
        <circle cx="8" cy="14" r="0.5" fill={stroke} stroke="none" />
      </svg>
    ),
    Network: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="2" />
        <circle cx="4" cy="6" r="2" />
        <circle cx="20" cy="6" r="2" />
        <circle cx="4" cy="18" r="2" />
        <circle cx="20" cy="18" r="2" />
        <line x1="6" y1="7" x2="10" y2="11" />
        <line x1="18" y1="7" x2="14" y2="11" />
        <line x1="6" y1="17" x2="10" y2="13" />
        <line x1="18" y1="17" x2="14" y2="13" />
      </svg>
    ),
  }

  return <>{icons[type]}</>
}
