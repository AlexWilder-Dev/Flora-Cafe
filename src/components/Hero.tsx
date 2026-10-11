import { AnimatePresence, motion } from 'framer-motion'
import { delivery } from '../data/contact'
import { featured, findItem } from '../data/menu'
import { photos } from '../data/photos'
import { useMode } from '../context/ModeContext'
import { useLondonClock } from '../hooks/useLondonClock'
import { formatPrice } from '../lib/format'
import { openStatus } from '../lib/time'
import { Img } from './Img'

const base = import.meta.env.BASE_URL

const COPY = {
  day: {
    eyebrow: 'Golden Daylight',
    title: 'Meet the charm of Tooting Market',
    lede: 'Specialty coffee, organic açaí bowls, fluffy pancakes and sizzling rancheras. Brunch every day until 4pm.',
    menuCta: 'See the menu',
    pickTitle: 'Brunch favourites',
  },
  evening: {
    eyebrow: 'Evening Spark',
    title: 'Candle-lit tapas & cocktails',
    lede: 'Spanish plates, crisp wines and signature cocktails with live music. Open until 23:30, Thursday to Saturday.',
    menuCta: 'See tapas & cocktails',
    pickTitle: 'Tonight’s favourites',
  },
}

const spring = { type: 'spring', stiffness: 160, damping: 24 } as const

export function Hero() {
  const { mode } = useMode()
  const now = useLondonClock()
  const status = openStatus(now)
  const copy = COPY[mode]
  const photo = photos.hero[mode]

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__stage">
        <AnimatePresence initial={false}>
          <motion.div
            key={mode}
            className="hero__photo"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.5 }, scale: spring }}
          >
            <Img name={photo.image} alt={photo.alt} sizes="100vw" eager style={{ objectPosition: photo.position }} />
          </motion.div>
        </AnimatePresence>
        <div className="hero__scrim" aria-hidden="true" />

        <div className="container hero__content">
          <img
            className="hero__logo"
            src={`${base}images/logo-flora-white.webp`}
            alt="Flora SW17"
            width="300"
            height="61"
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              className="hero__copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={spring}
            >
              <p className="hero__eyebrow">{copy.eyebrow}</p>
              <h1 id="hero-title" className="hero__title">
                {copy.title}
              </h1>
              <p className="hero__lede">{copy.lede}</p>
            </motion.div>
          </AnimatePresence>

          <p className={`status-pill status-pill--hero${status.open ? ' is-open' : ''}`}>
            <span className="status-pill__dot" aria-hidden="true" />
            {status.label}
          </p>

          <div className="hero__ctas">
            <a className="btn btn--primary btn--lg" href="#book">
              Book a table
            </a>
            <a className="btn btn--light btn--lg" href="#menu">
              {copy.menuCta}
            </a>
            <a className="btn btn--text-light" href="#delivery">
              Order delivery
            </a>
          </div>
        </div>
      </div>

      <div className="hero__picks">
        <div className="container hero__picks-inner">
          <h2 className="hero__picks-title">{copy.pickTitle}</h2>
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={mode}
              className="hero__picks-list"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            >
              {featured[mode].map((f) => {
                const item = findItem(f.category, f.name)
                return (
                  <motion.li
                    key={f.name}
                    variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                    transition={spring}
                  >
                    <span className="hero__pick-name">{item.name}</span>
                    <span className="hero__pick-price">{formatPrice(item.price ?? 9.5)}</span>
                  </motion.li>
                )
              })}
            </motion.ul>
          </AnimatePresence>
          <p className="hero__picks-delivery">
            Also on{' '}
            {delivery.map((d, i) => (
              <span key={d.name}>
                {i > 0 && ' & '}
                <a href={d.url} target="_blank" rel="noopener noreferrer">
                  {d.name}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
