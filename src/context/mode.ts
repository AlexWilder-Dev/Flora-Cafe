import { createContext, useContext } from 'react'
import type { Mode } from '../lib/time'

export interface ModeContextValue {
  mode: Mode
  /** Switch mode; `origin` is the viewport point the new theme grows from. */
  setMode: (mode: Mode, origin?: { x: number; y: number }) => void
}

export const ModeContext = createContext<ModeContextValue | null>(null)

export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useMode must be used inside ModeProvider')
  return ctx
}
