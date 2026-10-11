/** 0 = Sunday … 6 = Saturday, matching Date#getDay(). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface OpeningDay {
  day: Weekday
  name: string
  short: string
  /** 24h "HH:MM", London time. */
  open: string
  close: string
  lateBar: boolean
}

export const TIMEZONE = 'Europe/London'

/** Brunch is served until this time every day. */
export const BRUNCH_UNTIL = '16:00'

/** Evening service (tapas, cocktails) starts at this time on late-bar days. */
export const EVENING_FROM = '16:00'

export const HAPPY_HOUR_UNTIL = '20:00'

/** Ordered Monday first for display. */
export const openingHours: OpeningDay[] = [
  { day: 1, name: 'Monday', short: 'Mon', open: '08:00', close: '16:00', lateBar: false },
  { day: 2, name: 'Tuesday', short: 'Tue', open: '08:00', close: '16:00', lateBar: false },
  { day: 3, name: 'Wednesday', short: 'Wed', open: '08:00', close: '16:00', lateBar: false },
  { day: 4, name: 'Thursday', short: 'Thu', open: '08:00', close: '23:30', lateBar: true },
  { day: 5, name: 'Friday', short: 'Fri', open: '08:00', close: '23:30', lateBar: true },
  { day: 6, name: 'Saturday', short: 'Sat', open: '08:00', close: '23:30', lateBar: true },
  { day: 0, name: 'Sunday', short: 'Sun', open: '08:30', close: '16:00', lateBar: false },
]

/** Compact grouping for headers and the footer. */
export const hoursSummary = [
  { days: 'Mon – Wed', time: '08:00 – 16:00' },
  { days: 'Thu – Sat', time: '08:00 – 23:30', note: 'Late bar' },
  { days: 'Sun', time: '08:30 – 16:00' },
]

export function hoursFor(day: Weekday): OpeningDay {
  return openingHours.find((d) => d.day === day)!
}
