import { EVENING_FROM, TIMEZONE, hoursFor, openingHours, type Weekday } from '../data/hours'

export type Mode = 'day' | 'evening'

export interface LondonNow {
  day: Weekday
  /** Minutes since local midnight. */
  minutes: number
  /** YYYY-MM-DD in London. */
  isoDate: string
}

const WEEKDAYS: Record<string, Weekday> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIMEZONE,
  weekday: 'short',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export function londonNow(date = new Date()): LondonNow {
  const parts = Object.fromEntries(formatter.formatToParts(date).map((p) => [p.type, p.value]))
  return {
    day: WEEKDAYS[parts.weekday],
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
    isoDate: `${parts.year}-${parts.month}-${parts.day}`,
  }
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function toHHMM(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/** Evening on late-bar days (Thu–Sat) from 16:00, Day otherwise. */
export function defaultMode(now = londonNow()): Mode {
  const today = hoursFor(now.day)
  return today.lateBar && now.minutes >= toMinutes(EVENING_FROM) ? 'evening' : 'day'
}

export interface OpenStatus {
  open: boolean
  label: string
}

export function openStatus(now = londonNow()): OpenStatus {
  const today = hoursFor(now.day)
  const opens = toMinutes(today.open)
  const closes = toMinutes(today.close)

  if (now.minutes >= opens && now.minutes < closes) {
    return { open: true, label: `Open now · until ${today.close}` }
  }
  if (now.minutes < opens) {
    return { open: false, label: `Opens today at ${today.open}` }
  }
  const next = ((now.day + 1) % 7) as Weekday
  return { open: false, label: `Opens tomorrow at ${hoursFor(next).open}` }
}

/** Weekday for an ISO date string, independent of the viewer's timezone. */
export function weekdayOf(isoDate: string): Weekday {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay() as Weekday
}

export function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10)
}

/**
 * Bookable 30-minute start times for a date. A table has to be seated at least
 * `minStay` minutes before closing; for today, slots already past are dropped.
 */
export function bookingSlots(isoDate: string, minStay = 30, now = londonNow()): string[] {
  const day = hoursFor(weekdayOf(isoDate))
  const start = toMinutes(day.open)
  const last = toMinutes(day.close) - minStay
  const earliest = isoDate === now.isoDate ? now.minutes + 30 : -1
  const slots: string[] = []
  for (let t = start; t <= last; t += 30) {
    if (t >= earliest) slots.push(toHHMM(t))
  }
  return slots
}

export function isEveningSlot(isoDate: string, hhmm: string): boolean {
  return hoursFor(weekdayOf(isoDate)).lateBar && toMinutes(hhmm) >= toMinutes(EVENING_FROM)
}

export const weekOrder = openingHours.map((d) => d.day)
