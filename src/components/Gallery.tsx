import { motion } from 'framer-motion'
import { useState } from 'react'
import { gallery } from '../data/gallery'
import { Img } from './Img'
import { Lightbox } from './Lightbox'
import { SectionHeading } from './SectionHeading'

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)

  return (
    <section id="gallery" className="section gallery" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading id="gallery-title" eyebrow="Gallery" title="A look inside" />
        <ul className="gallery__grid">
          {gallery.map((g, i) => (
            <motion.li
              key={g.image}
              className={`gallery__item gallery__item--${g.shape ?? 'square'}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ type: 'spring', stiffness: 200, damping: 26, delay: (i % 3) * 0.05 }}
            >
              <button type="button" className="gallery__btn" onClick={() => setIndex(i)}>
                <Img name={g.image} alt={g.alt} sizes="(min-width: 960px) 30vw, 50vw" />
                <span className="visually-hidden">Open larger view</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
      <Lightbox items={gallery} index={index} onChange={setIndex} />
    </section>
  )
}
