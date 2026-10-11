import { motion } from 'framer-motion'
import { useState } from 'react'
import { gallery } from '../data/gallery'
import { imageMeta } from '../data/images'
import { Img } from './Img'
import { Lightbox } from './Lightbox'
import { SectionHeading } from './SectionHeading'

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)

  return (
    <section id="gallery" className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading
          id="gallery-title"
          eyebrow="The Flora experience"
          title={
            <>
              Discover Flora through <em>every moment</em>
            </>
          }
          intro="From vibrant brunch mornings to intimate candle-lit evenings. Tap a photo to see it larger."
        />
        <ul className="gallery__grid">
          {gallery.map((g, i) => {
            const { width, height } = imageMeta[g.image]
            return (
              <motion.li
                key={g.image}
                className="gallery__item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ type: 'spring', stiffness: 160, damping: 24, delay: (i % 4) * 0.04 }}
              >
                <button
                  type="button"
                  className="gallery__btn"
                  style={{ aspectRatio: `${width} / ${height}` }}
                  onClick={() => setIndex(i)}
                >
                  <Img name={g.image} alt={g.alt} sizes="(min-width: 1080px) 22vw, (min-width: 720px) 30vw, 46vw" />
                </button>
              </motion.li>
            )
          })}
        </ul>
      </div>
      <Lightbox items={gallery} index={index} onChange={setIndex} />
    </section>
  )
}
