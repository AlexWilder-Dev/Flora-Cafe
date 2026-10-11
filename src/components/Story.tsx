import { motion } from 'framer-motion'
import { venue } from '../data/contact'
import { photos } from '../data/photos'
import { Img } from './Img'
import { Sprig } from './Botanical'

export function Story() {
  return (
    <section id="story" className="section story" aria-labelledby="story-title">
      <div className="container story__grid">
        <motion.figure
          className="story__photo"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ type: 'spring', stiffness: 140, damping: 22 }}
        >
          <Img name={photos.story.image} alt={photos.story.alt} sizes="(min-width: 960px) 42vw, 100vw" />
          <Sprig className="story__sprig" />
        </motion.figure>

        <div className="story__text">
          <p className="eyebrow">Founded {venue.founded}</p>
          <h2 id="story-title" className="section-title">
            A hidden gem in the heart of Tooting Market
          </h2>
          <p>
            Flora was founded to create a warm, welcoming space inside London’s historic and vibrant Tooting Market.
            Walk down the main market corridor and you’ll find our lush, green, floral corner.
          </p>
          <p>
            Inspired by premium specialty coffee, nourishing daytime dishes and authentic Spanish tapas, we designed a
            space that changes with the rhythm of your day: bright brunches in the morning, intimate candle-lit evenings
            later on.
          </p>
          <blockquote className="story__quote">
            <p>“Every day has a rhythm. We have a recipe for each hour.”</p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
