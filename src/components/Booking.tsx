import { AnimatePresence, motion } from 'framer-motion'
import { useId, useMemo, useState, type FormEvent } from 'react'
import { BOTTOMLESS_MINUTES, bottomlessIncludes, bottomlessPackages } from '../data/bottomless'
import { venue } from '../data/contact'
import { hoursFor } from '../data/hours'
import { addDays, bookingSlots, isEveningSlot, londonNow, weekdayOf } from '../lib/time'
import { formatPrice } from '../lib/format'
import { photos } from '../data/photos'
import { BotanicalPanel } from './Botanical'
import { Img } from './Img'
import { SectionHeading } from './SectionHeading'

const MAX_PARTY = 12

function longDate(isoDate: string) {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, d)),
  )
}

/** First date (today or later) that still has at least one bookable slot. */
function firstBookableDate() {
  const today = londonNow().isoDate
  return bookingSlots(today).length > 0 ? today : addDays(today, 1)
}

interface Confirmed {
  name: string
  party: number
  date: string
  time: string
  packageName?: string
}

export function Booking() {
  const today = londonNow().isoDate
  const [party, setParty] = useState(2)
  const [date, setDate] = useState(firstBookableDate)
  const [time, setTime] = useState('')
  const [bottomless, setBottomless] = useState(false)
  const [pkg, setPkg] = useState(bottomlessPackages[0].id)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null)
  const ids = { date: useId(), name: useId(), phone: useId(), notes: useId(), slots: useId(), err: useId() }

  const slots = useMemo(() => bookingSlots(date, bottomless ? BOTTOMLESS_MINUTES : 30), [date, bottomless])
  const day = hoursFor(weekdayOf(date))
  const groups = useMemo(() => {
    const daySlots = slots.filter((s) => !isEveningSlot(date, s))
    const eveningSlots = slots.filter((s) => isEveningSlot(date, s))
    return [
      { label: day.lateBar ? 'Daytime' : 'Brunch', slots: daySlots },
      { label: 'Evening', slots: eveningSlots },
    ].filter((g) => g.slots.length > 0)
  }, [slots, date, day.lateBar])

  // A chosen time that is no longer offered (new date, or Bottomless trimmed the day) counts as unset.
  const chosen = slots.includes(time) ? time : ''

  const selectedPkg = bottomlessPackages.find((p) => p.id === pkg)!

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!chosen) return setError('Pick a time to continue.')
    if (!name.trim()) return setError('Add a name for the booking.')
    if (!phone.trim()) return setError('Add a phone number so the team could reach you.')
    setError('')
    setConfirmed({ name: name.trim(), party, date, time: chosen, packageName: bottomless ? selectedPkg.name : undefined })
  }

  function reset() {
    setConfirmed(null)
    setTime('')
    setNotes('')
  }

  return (
    <section id="book" className="section booking" aria-labelledby="book-title">
      <div className="booking__media" aria-hidden="true">
        {photos.booking ? (
          <Img name={photos.booking.image} alt="" sizes="(min-width: 960px) 45vw, 100vw" />
        ) : (
          <BotanicalPanel tone="evening" className="booking__panel-art" />
        )}
      </div>
      <div className="booking__panel">
        <SectionHeading id="book-title" eyebrow="Reservations" title="Book a table" />
        <p className="demo-note" role="note">
          Demo only: this form doesn’t send anything. To book for real, email{' '}
          <a href={`mailto:${venue.email}`}>{venue.email}</a> or call <a href={venue.phoneHref}>{venue.phone}</a>.
        </p>

        <AnimatePresence mode="wait" initial={false}>
          {confirmed ? (
            <motion.div
              key="done"
              className="booking__done"
              role="status"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            >
              <p className="booking__done-kicker">Request noted</p>
              <h3 className="booking__done-title">See you soon, {confirmed.name.split(' ')[0]}.</h3>
              <dl className="booking__summary">
                <div>
                  <dt>Guests</dt>
                  <dd>{confirmed.party}</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>{longDate(confirmed.date)}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{confirmed.time}</dd>
                </div>
                {confirmed.packageName && (
                  <div>
                    <dt>Bottomless</dt>
                    <dd>{confirmed.packageName}</dd>
                  </div>
                )}
              </dl>
              <p className="booking__done-note">
                This is a demo, so no booking has been made and nothing was sent.
              </p>
              <button type="button" className="btn btn--ghost" onClick={reset}>
                Make another booking
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="booking__form"
              onSubmit={submit}
              noValidate
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              aria-describedby={error ? ids.err : undefined}
            >
              <div className="field field--row">
                <span className="field__label" id="party-label">
                  Guests
                </span>
                <div className="stepper" role="group" aria-labelledby="party-label">
                  <button
                    type="button"
                    className="stepper__btn"
                    onClick={() => setParty((p) => Math.max(1, p - 1))}
                    disabled={party <= 1}
                    aria-label="Fewer guests"
                  >
                    −
                  </button>
                  <output className="stepper__value" aria-live="polite">
                    {party}
                  </output>
                  <button
                    type="button"
                    className="stepper__btn"
                    onClick={() => setParty((p) => Math.min(MAX_PARTY, p + 1))}
                    disabled={party >= MAX_PARTY}
                    aria-label="More guests"
                  >
                    +
                  </button>
                </div>
              </div>
              {party >= MAX_PARTY && (
                <p className="field__hint">
                  Bigger group? Email <a href={`mailto:${venue.email}`}>{venue.email}</a>.
                </p>
              )}

              <div className="field">
                <label className="field__label" htmlFor={ids.date}>
                  Date
                </label>
                <input
                  id={ids.date}
                  className="input"
                  type="date"
                  value={date}
                  min={today}
                  max={addDays(today, 90)}
                  required
                  onChange={(e) => e.target.value && setDate(e.target.value)}
                />
                <p className="field__hint">
                  {day.name}: open {day.open}–{day.close}
                  {day.lateBar ? ' · late bar' : ''}
                </p>
              </div>

              <fieldset className="field">
                <legend className="field__label" id={ids.slots}>
                  Time
                </legend>
                {groups.length === 0 ? (
                  <p className="field__hint">No times left on this date. Try another day.</p>
                ) : (
                  groups.map((g) => (
                    <div key={g.label} className="slots">
                      {groups.length > 1 && <p className="slots__label">{g.label}</p>}
                      <div className="slots__grid">
                        {g.slots.map((s) => (
                          <label key={s} className="slot">
                            <input
                              type="radio"
                              name="time"
                              value={s}
                              checked={chosen === s}
                              onChange={() => setTime(s)}
                            />
                            <span>{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </fieldset>

              <div className="field">
                <label className="toggle">
                  <input
                    type="checkbox"
                    role="switch"
                    checked={bottomless}
                    onChange={(e) => setBottomless(e.target.checked)}
                  />
                  <span className="toggle__track" aria-hidden="true">
                    <motion.span
                      className="toggle__thumb"
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    />
                  </span>
                  <span className="toggle__text">Make it Bottomless</span>
                </label>
                <AnimatePresence initial={false}>
                  {bottomless && (
                    <motion.div
                      className="bottomless-pick"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                    >
                      <div className="bottomless-pick__inner" role="radiogroup" aria-label="Bottomless package">
                        {bottomlessPackages.map((p) => (
                          <label key={p.id} className="pick">
                            <input
                              type="radio"
                              name="package"
                              value={p.id}
                              checked={pkg === p.id}
                              onChange={() => setPkg(p.id)}
                            />
                            <span className="pick__name">{p.name}</span>
                            <span className="pick__price">{formatPrice(p.price)}pp</span>
                          </label>
                        ))}
                        <p className="field__hint">
                          {BOTTOMLESS_MINUTES} minutes per person, including {bottomlessIncludes.day.toLowerCase()} by day or{' '}
                          {bottomlessIncludes.evening.toLowerCase()} in the evening. The whole table takes part
                          {party > 1 ? ` (${party} × ${formatPrice(selectedPkg.price)})` : ''}. Times shown leave the full{' '}
                          {BOTTOMLESS_MINUTES} minutes before closing.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="field-pair">
                <div className="field">
                  <label className="field__label" htmlFor={ids.name}>
                    Name
                  </label>
                  <input
                    id={ids.name}
                    className="input"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label className="field__label" htmlFor={ids.phone}>
                    Phone
                  </label>
                  <input
                    id={ids.phone}
                    className="input"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="field__label" htmlFor={ids.notes}>
                  Allergies or occasion <span className="field__optional">(optional)</span>
                </label>
                <textarea
                  id={ids.notes}
                  className="input input--area"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {error && (
                <p className="form-error" id={ids.err} role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="btn btn--primary btn--block">
                Request {party} {party === 1 ? 'seat' : 'seats'}
                {chosen ? ` at ${chosen}` : ''}
              </button>
              <p className="field__hint field__hint--center">
                {day.lateBar ? 'Brunch until 4pm, then tapas & cocktails.' : 'Brunch is served all day until close.'}
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
