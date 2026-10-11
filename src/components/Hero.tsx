import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { featured, findItem } from '../data/menu'
import { photos } from '../data/photos'
import { useMode } from '../context/mode'
import { useLondonClock } from '../hooks/useLondonClock'
import { formatPrice } from '../lib/format'
import { openStatus } from '../lib/time'
import { Img } from './Img'

const COPY = {
  day: {
    eyebrow: 'The Golden Daylight',
    title: (
      <>
        Meet the charm of <em>Tooting Market</em>
      </>
    ),
    lede: 'Specialty coffee, organic açaí bowls, fluffy pancakes and sizzling ranchera plates in a lush, floral corner of the market. Brunch every day until 4pm.',
    menuCta: 'See the menu',
    picks: 'Brunch favourites',
  },
  evening: {
    eyebrow: 'The Evening Spark',
    title: (
      <>
        <span className="nowrap">Candle-lit</span> tapas <em>&amp; cocktails</em>
      </>
    ),
    lede: 'Spanish plates, crisp wines and signature cocktails under the blossom, with live music. Open until 23:30, Thursday to Saturday.',
    menuCta: 'See tapas & cocktails',
    picks: 'Tonight’s favourites',
  },
}

const spring = { type: 'spring', stiffness: 140, damping: 22 } as const

function Badge() {
  return (
    <svg className="hero__badge" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <path id="badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0" />
      </defs>
      <circle cx="60" cy="60" r="59" className="hero__badge-disc" />
      <text className="hero__badge-text">
        <textPath href="#badge-circle" startOffset="0">
          Brunch by day · Tapas by night ·
        </textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" className="hero__badge-mark">
        SW17
      </text>
    </svg>
  )
}

export function Hero() {
  const { mode } = useMode()
  const now = useLondonClock()
  const status = openStatus(now)
  const copy = COPY[mode]
  const photo = photos.hero[mode]
  const reduce = useReducedMotion()
  const media = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: media, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%'])

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__text">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={spring}
            >
              <p className="eyebrow eyebrow--rule">{copy.eyebrow}</p>
              <h1 id="hero-title" className="hero__title">
                {copy.title}
              </h1>
              <p className="hero__lede">{copy.lede}</p>
            </motion.div>
          </AnimatePresence>

          <div className="hero__ctas">
            <a className="btn btn--primary btn--lg" href="#book">
              Book a table
            </a>
            <a className="btn btn--outline btn--lg" href="#menu">
              {copy.menuCta}
            </a>
          </div>

          <div className="hero__meta">
            <p className={`status${status.open ? ' is-open' : ''}`}>
              <span className="status__dot" aria-hidden="true" />
              {status.label}
            </p>
            <a className="link-arrow" href="#delivery">
              Order delivery
            </a>
          </div>

        </div>

        <div className="hero__media" ref={media}>
          <div className="arch hero__arch">
            <AnimatePresence initial={false}>
              <motion.div
                key={mode}
                className="arch__layer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div className="arch__parallax" style={{ y }}>
                  <Img
                    name={photo.image}
                    alt={photo.alt}
                    sizes="(min-width: 960px) 44vw, 92vw"
                    eager
                    style={{ objectPosition: photo.position }}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          <Badge />
        </div>

        <div className="hero__picks">
          <p className="hero__picks-title">{copy.picks}</p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={mode}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            >
              {featured[mode].map((f) => {
                const item = findItem(f.category, f.name)
                return (
                  <motion.li
                    key={f.name}
                    variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                    transition={spring}
                  >
                    <span>{item.name}</span>
                    <span className="hero__picks-price">{formatPrice(item.price ?? 9.5)}</span>
                  </motion.li>
                )
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
