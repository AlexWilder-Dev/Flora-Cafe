import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { useMode } from '../context/mode'
import type { Mode } from '../lib/time'

const OPTIONS: { mode: Mode; label: string; short: string }[] = [
  { mode: 'day', label: 'Golden Daylight', short: 'Day' },
  { mode: 'evening', label: 'Evening Spark', short: 'Evening' },
]

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <circle cx="10" cy="10" r="4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4" />
      </g>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <path d="M15.5 12.6A6.5 6.5 0 0 1 7.4 4.5a6.5 6.5 0 1 0 8.1 8.1Z" fill="currentColor" />
    </svg>
  )
}

export function ModeSwitch({ id = 'mode' }: { id?: string }) {
  const { mode, setMode } = useMode()

  function choose(next: Mode, e: MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    setMode(next, { x: r.left + r.width / 2, y: r.top + r.height / 2 })
  }

  return (
    <div className="mode-switch" role="group" aria-label="Day or evening at Flora">
      {OPTIONS.map((o) => {
        const active = mode === o.mode
        return (
          <button
            key={o.mode}
            type="button"
            className={`mode-switch__btn${active ? ' is-active' : ''}`}
            aria-pressed={active}
            title={o.label}
            onClick={(e) => choose(o.mode, e)}
          >
            {active && (
              <motion.span
                layoutId={`${id}-thumb`}
                className="mode-switch__thumb"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span className="mode-switch__icon">{o.mode === 'day' ? <SunIcon /> : <MoonIcon />}</span>
            <span className="mode-switch__label">{o.short}</span>
          </button>
        )
      })}
    </div>
  )
}
