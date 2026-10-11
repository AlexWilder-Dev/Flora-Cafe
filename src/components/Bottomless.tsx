import { motion } from 'framer-motion'
import { BOTTOMLESS_MINUTES, bottomlessIncludes, bottomlessPackages, bottomlessRules } from '../data/bottomless'
import { photos } from '../data/photos'
import { formatPrice } from '../lib/format'
import { Img } from './Img'

export function Bottomless() {
  return (
    <section id="bottomless" className="section bottomless" aria-labelledby="bottomless-title">
      <div className="container bottomless__grid">
        <motion.figure
          className="bottomless__photo"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ type: 'spring', stiffness: 110, damping: 22 }}
        >
          <Img name={photos.bottomless.image} alt={photos.bottomless.alt} sizes="(min-width: 960px) 40vw, 92vw" />
          <span className="bottomless__stamp" aria-hidden="true">
            <strong>{BOTTOMLESS_MINUTES}</strong> minutes
          </span>
        </motion.figure>

        <div className="bottomless__content">
          <p className="eyebrow eyebrow--rule">Bottomless experience</p>
          <h2 id="bottomless-title" className="section-title">
            Great food, free-flowing drinks <em>&amp; good company</em>
          </h2>
          <p className="section-intro">
            Gather your friends, choose a drinks package and pair it with a brunch main by day or Spanish tapas in the
            evening.
          </p>

          <ol className="packages">
            {bottomlessPackages.map((p, i) => (
              <motion.li
                key={p.id}
                className="package"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ type: 'spring', stiffness: 200, damping: 26, delay: i * 0.06 }}
              >
                <div className="package__head">
                  <h3 className="package__name">{p.name}</h3>
                  <p className="package__price">
                    {formatPrice(p.price)}
                    <span> pp</span>
                  </p>
                </div>
                <p className="package__drinks">{p.drinks.join(' · ')}</p>
              </motion.li>
            ))}
          </ol>

          <p className="bottomless__food">
            Every package includes <strong>{bottomlessIncludes.day.toLowerCase()}</strong> by day, or{' '}
            <strong>{bottomlessIncludes.evening.toLowerCase()}</strong> in the evening.
          </p>
          <ul className="bottomless__rules">
            {bottomlessRules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <a className="btn btn--primary btn--lg" href="#book">
            Book a bottomless table
          </a>
        </div>
      </div>
    </section>
  )
}
