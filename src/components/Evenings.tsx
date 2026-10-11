import { motion } from 'framer-motion'
import { findItem } from '../data/menu'
import { photos } from '../data/photos'
import { Img } from './Img'

const HIGHLIGHTS = [
  { title: 'Thursday – Saturday', body: 'Open late until 23:30: a live music bar, craft lagers and freshly shaken sangria.' },
  { title: 'Happy Hour until 8pm', body: 'Unwind after work with great drinks and good vibes.' },
  { title: 'DJ every Friday', body: 'Turn up the volume with live DJ nights inside Tooting Market.' },
  { title: 'Live music', body: 'Spritzes, Pornstar Martinis and sangria with live tunes in London’s favourite indoor market.' },
]

const COCKTAILS = ['Pornstar Martini', 'Aperol Spritz', 'Espresso Martini', 'Flora Colada', 'Margarita', 'Negroni'].map((n) =>
  findItem('cocktails', n),
)

export function Evenings() {
  const [main, second, third] = photos.evenings
  return (
    <section id="evenings" className="section evenings theme-evening" aria-labelledby="evenings-title">
      <div className="container">
        <div className="evenings__intro">
          <div>
            <p className="eyebrow eyebrow--rule">Evenings at Flora</p>
            <h2 id="evenings-title" className="section-title">
              Cocktails, fine wine <em>&amp; live beats</em>
            </h2>
          </div>
          <p className="section-intro">
            Thursday to Saturday, Flora becomes an intimate candle-lit bar: Spanish tapas, cocktails, crisp wines and
            live music until 23:30, right inside London’s favourite indoor market.
          </p>
        </div>

        <div className="evenings__collage">
          {[main, second, third].map((p, i) => (
            <motion.figure
              key={p.image}
              className={`evenings__photo evenings__photo--${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ type: 'spring', stiffness: 110, damping: 22, delay: i * 0.08 }}
            >
              <Img name={p.image} alt={p.alt} sizes={i === 0 ? '(min-width: 960px) 56vw, 92vw' : '(min-width: 960px) 26vw, 45vw'} />
            </motion.figure>
          ))}
        </div>

        <div className="evenings__details">
          <ul className="evenings__highlights">
            {HIGHLIGHTS.map((h) => (
              <li key={h.title}>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </li>
            ))}
          </ul>

          <div className="evenings__bar">
            <h3 className="evenings__bar-title">
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
            <a className="btn btn--primary btn--lg" href="#book">
              Book for tonight
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
