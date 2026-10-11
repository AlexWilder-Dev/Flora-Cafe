import { motion } from 'framer-motion'
import { findItem } from '../data/menu'
import { photos } from '../data/photos'
import { Img } from './Img'
import { SectionHeading } from './SectionHeading'

const HIGHLIGHTS = [
  { title: 'Thursday – Saturday', body: 'Open late until 23:30, with a live music bar, craft lagers and freshly shaken sangria.' },
  { title: 'Happy Hour', body: 'Great drinks and good vibes until 8pm. Unwind after work.' },
  { title: 'DJ every Friday', body: 'Every Friday evening the volume goes up, right inside Tooting Market.' },
  { title: 'Live music', body: 'Spritzes, Pornstar Martinis and sangria with live tunes in London’s favourite indoor market.' },
]

const COCKTAILS = ['Pornstar Martini', 'Aperol Spritz', 'Espresso Martini', 'Flora Colada', 'Margarita', 'Negroni'].map((n) =>
  findItem('cocktails', n),
)

export function Evenings() {
  return (
    <section id="evenings" className="section evenings" aria-labelledby="evenings-title">
      <div className="evenings__media" aria-hidden="true">
        <Img name={photos.evenings.image} alt="" sizes="100vw" />
      </div>
      <div className="container evenings__inner">
        <SectionHeading
          id="evenings-title"
          eyebrow="Evenings at Flora"
          title="Cocktails, wine & live beats"
          intro="Thursday to Saturday, Flora becomes an intimate candle-lit bar: Spanish tapas, cocktails, crisp wines and live music until 23:30."
        />

        <ul className="evenings__highlights">
          {HIGHLIGHTS.map((h, i) => (
            <motion.li
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ type: 'spring', stiffness: 220, damping: 26, delay: i * 0.05 }}
            >
              <h3>{h.title}</h3>
              <p>{h.body}</p>
            </motion.li>
          ))}
        </ul>

        <div className="evenings__cocktails">
          <h3 className="evenings__cocktails-title">
            From the bar <span>All cocktails £9.50</span>
          </h3>
          <ul>
            {COCKTAILS.map((c) => (
              <li key={c.name}>
                <strong>{c.name}</strong>
                <span>{c.description}</span>
              </li>
            ))}
          </ul>
          <a className="btn btn--primary" href="#book">
            Book for tonight
          </a>
        </div>
      </div>
    </section>
  )
}
