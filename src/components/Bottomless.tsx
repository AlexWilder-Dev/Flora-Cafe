import { motion } from 'framer-motion'
import { BOTTOMLESS_MINUTES, bottomlessIncludes, bottomlessPackages, bottomlessRules } from '../data/bottomless'
import { photos } from '../data/photos'
import { formatPrice } from '../lib/format'
import { Img } from './Img'
import { SectionHeading } from './SectionHeading'

export function Bottomless() {
  return (
    <section id="bottomless" className="section bottomless" aria-labelledby="bottomless-title">
      <div className="container bottomless__layout">
        <div className="bottomless__intro">
          <SectionHeading
            id="bottomless-title"
            eyebrow={`${BOTTOMLESS_MINUTES}-minute bottomless`}
            title="Great food, free-flowing drinks & good company"
            intro="Gather your friends, choose a drinks package and pair it with brunch during the day or Spanish tapas in the evening."
          />
          <div className="bottomless__photos" aria-hidden="true">
            {photos.bottomless.map((p, i) => (
              <Img key={p.image} name={p.image} alt="" sizes="(min-width: 960px) 18vw, 45vw" className={`bottomless__photo bottomless__photo--${i}`} />
            ))}
          </div>
        </div>

        <ol className="packages">
          {bottomlessPackages.map((p, i) => (
            <motion.li
              key={p.id}
              className={`package${i === 2 ? ' package--feature' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ type: 'spring', stiffness: 220, damping: 26, delay: i * 0.06 }}
            >
              <h3 className="package__name">{p.name}</h3>
              <p className="package__price">
                <span className="package__amount">{formatPrice(p.price)}</span>
                <span className="package__per">per person</span>
              </p>
              <ul className="package__drinks" aria-label="Drinks included">
                {p.drinks.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <p className="package__food">
                <span>{bottomlessIncludes.day}</span> by day, or <span>{bottomlessIncludes.evening.toLowerCase()}</span> in
                the evening
              </p>
            </motion.li>
          ))}
        </ol>

        <div className="bottomless__rules">
          <h3 className="bottomless__rules-title">Please note</h3>
          <ul>
            {bottomlessRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <a className="btn btn--primary" href="#book">
            Book a bottomless table
          </a>
        </div>
      </div>
    </section>
  )
}
