import { motion } from 'framer-motion'
import { venue } from '../data/contact'
import { photos } from '../data/photos'
import { Img } from './Img'

const FACTS = [
  { label: 'Founded', value: venue.founded },
  { label: 'Find us', value: 'Unit 22a, Tooting Market' },
  { label: 'Good to know', value: 'Dog friendly · Wheelchair access' },
]

export function Story() {
  return (
    <section id="story" className="section story" aria-labelledby="story-title">
      <div className="container story__grid">
        <motion.figure
          className="story__photo"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ type: 'spring', stiffness: 110, damping: 22 }}
        >
          <Img name={photos.story.image} alt={photos.story.alt} sizes="(min-width: 960px) 40vw, 92vw" />
          <figcaption>Unit 22a · down the main corridor</figcaption>
        </motion.figure>

        <div className="story__text">
          <p className="eyebrow eyebrow--rule">Our story</p>
          <h2 id="story-title" className="section-title">
            A hidden gem in the heart of <em>Tooting Market</em>
          </h2>
          <p className="story__lead">
            Flora was founded in {venue.founded} to create a warm, welcoming space inside London’s historic, vibrant
            Tooting Market. Walk down the main market corridor and you’ll find our lush, green, floral enclave.
          </p>
          <p>
            Inspired by premium specialty coffee, nourishing day dishes and authentic Spanish tapas, we designed a space
            that changes with the rhythm of your day: bright brunches by morning, intimate candle-lit evenings later on.
          </p>
          <blockquote className="story__quote">
            <p>“Every day has a rhythm. We have a recipe for each hour.”</p>
          </blockquote>
          <dl className="facts">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
