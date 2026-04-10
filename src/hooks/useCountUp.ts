// hooks/useCountUp.ts
import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  start?: number
  decimals?: number
  prefix?: string
  suffix?: string
  enabled?: boolean
}

export function useCountUp({
  end,
  duration = 1200,
  start = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  enabled = true,
}: UseCountUpOptions) {
  const [value, setValue] = useState(start)
  const frameRef = useRef<number>(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) {
      setValue(end)
      return
    }

    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setValue(end)
      return
    }

    startTimeRef.current = null
    const startVal = start

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startVal + (end - startVal) * eased

      setValue(parseFloat(current.toFixed(decimals)))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setValue(end)
      }
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [end, duration, start, decimals, enabled])

  const formatted = `${prefix}${value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`

  return formatted
}
