import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { defaultMode, type Mode } from '../lib/time'
import { springEasing } from '../lib/spring'
import { ModeContext } from './mode'

const reveal = springEasing({ stiffness: 90, damping: 20 })

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(() => defaultMode())

  useEffect(() => {
    document.documentElement.dataset.mode = mode
    const meta = document.querySelector('meta[name="theme-color"]')
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
    if (meta && bg) meta.setAttribute('content', bg)
  }, [mode])

  const setMode = useCallback(
    (next: Mode, origin?: { x: number; y: number }) => {
      if (next === mode) return
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> }
      }
      if (!doc.startViewTransition || prefersReducedMotion()) {
        setModeState(next)
        return
      }
      const x = origin?.x ?? window.innerWidth / 2
      const y = origin?.y ?? 0
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      const transition = doc.startViewTransition(() => {
        flushSync(() => setModeState(next))
        document.documentElement.dataset.mode = next
      })
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: reveal.duration, easing: reveal.easing, pseudoElement: '::view-transition-new(root)' },
          )
        })
        .catch(() => {})
    },
    [mode],
  )

  const value = useMemo(() => ({ mode, setMode }), [mode, setMode])
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
}
