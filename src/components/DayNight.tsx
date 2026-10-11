import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { photos } from '../data/photos'
import { useMode } from '../context/mode'
import type { Mode } from '../lib/time'
import { Img } from './Img'

const PANELS: { mode: Mode; title: string; when: string; body: string }[] = [
  {
    mode: 'day',
    title: 'The Golden Daylight',
    when: 'Every day · until 4pm',
    body: 'Organic açaí bowls packed with fresh fruit, thick fluffy berry pancakes, signature egg drops and cold-press juices.',
  },
  {
    mode: 'evening',
    title: 'The Evening Spark',
    when: 'Thursday – Saturday · until 23:30',
    body: 'An intimate candle-lit setting, Spanish cured meats, sizzling tapas, crisp wines and signature cocktails.',
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
        <header className="section-heading section-heading--split">
          <div>
            <p className="eyebrow eyebrow--rule">From sunrise to late</p>
            <h2 id="day-night-title" className="section-title">
              One space, <em>two moods</em>
            </h2>
          </div>
          <p className="section-intro">
            Flora changes with the time of day. Pick a mood and the whole page follows, from the photos to the menu.
          </p>
        </header>

        <div className="day-night__panels">
          {PANELS.map((p, i) => {
            const active = p.mode === mode
            const photo = photos.dayNight[p.mode]
            return (
              <motion.article
                key={p.mode}
                className={`mood mood--${p.mode}${active ? ' is-active' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ type: 'spring', stiffness: 120, damping: 22, delay: i * 0.08 }}
                aria-labelledby={`mood-${p.mode}`}
              >
                <Img name={photo.image} alt={photo.alt} sizes="(min-width: 900px) 46vw, 92vw" className="mood__photo" />
                <div className="mood__body">
                  <p className="mood__when">{p.when}</p>
                  <h3 id={`mood-${p.mode}`} className="mood__title">
                    {p.title}
                  </h3>
                  <p className="mood__text">{p.body}</p>
                  {active ? (
                    <p className="mood__current">
                      <span aria-hidden="true">●</span> Showing now
                    </p>
                  ) : (
                    <button type="button" className="btn btn--glass" onClick={(e) => switchTo(p.mode, e)}>
                      See Flora by {p.mode === 'day' ? 'day' : 'night'}
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
