import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { photos } from '../data/photos'
import { useMode } from '../context/ModeContext'
import type { Mode } from '../lib/time'
import { Img } from './Img'

const PANELS: {
  mode: Mode
  title: string
  when: string
  body: string
  points: string[]
}[] = [
  {
    mode: 'day',
    title: 'The Golden Daylight',
    when: 'Every day · until 4pm',
    body: 'Nourishing organic açaí bowls packed with fresh fruit, thick fluffy berry pancakes, signature egg drops and cold-press juices.',
    points: ['Specialty coffee', 'Organic açaí bowls', 'Pancakes & Benedicts', 'Cold-press juices & smoothies'],
  },
  {
    mode: 'evening',
    title: 'The Evening Spark',
    when: 'Thursday – Saturday · until 23:30',
    body: 'An intimate candle-lit setting with Spanish cured meats, sizzling hot tapas, crisp wines and expertly crafted signature cocktails.',
    points: ['Spanish tapas', 'Cocktails & sangria', 'Live music, DJ Fridays', 'Happy Hour until 8pm'],
  },
]

export function DayNight() {
  const { mode, setMode } = useMode()

  function switchTo(next: Mode, e: MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    setMode(next, { x: r.left + r.width / 2, y: r.top + r.height / 2 })
  }

  return (
    <section id="day-night" className="section day-night" aria-labelledby="day-night-title">
      <div className="container">
        <header className="section-heading section-heading--center">
          <p className="eyebrow">From sunrise to late</p>
          <h2 id="day-night-title" className="section-title">
            One space, two moods
          </h2>
          <p className="section-intro">Flora changes with the time of day. Pick a mood to re-light the whole page.</p>
        </header>

        <div className="day-night__panels">
          {PANELS.map((p, i) => {
            const active = p.mode === mode
            const set = photos.dayNight[p.mode]
            return (
              <motion.article
                key={p.mode}
                className={`mood mood--${p.mode}${active ? ' is-active' : ''}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ type: 'spring', stiffness: 160, damping: 24, delay: i * 0.08 }}
                aria-labelledby={`mood-${p.mode}`}
              >
                <div className="mood__photos">
                  {set.map((s, j) => (
                    <Img
                      key={s.image}
                      name={s.image}
                      alt={s.alt}
                      sizes="(min-width: 960px) 25vw, 50vw"
                      className={`mood__photo mood__photo--${j}`}
                    />
                  ))}
                </div>
                <div className="mood__body">
                  <p className="mood__when">{p.when}</p>
                  <h3 id={`mood-${p.mode}`} className="mood__title">
                    {p.title}
                  </h3>
                  <p>{p.body}</p>
                  <ul className="mood__points">
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  {active ? (
                    <p className="mood__current">You’re seeing Flora in this mood</p>
                  ) : (
                    <button type="button" className="btn btn--outline" onClick={(e) => switchTo(p.mode, e)}>
                      Switch to {p.mode === 'day' ? 'Daylight' : 'Evening'}
                    </button>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
