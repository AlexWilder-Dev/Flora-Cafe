import { useEffect, useState } from 'react'
import { londonNow, type LondonNow } from '../lib/time'

/** London wall-clock time, refreshed every minute. */
export function useLondonClock(): LondonNow {
  const [now, setNow] = useState(() => londonNow())
  useEffect(() => {
    const id = window.setInterval(() => setNow(londonNow()), 60_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}
