import { delivery } from '../data/contact'
import { SectionHeading } from './SectionHeading'

const base = import.meta.env.BASE_URL

const LOGOS: Record<string, string> = {
  Deliveroo: 'order-deliveroo.webp',
  'Uber Eats': 'order-uber.webp',
}

export function Delivery() {
  return (
    <section id="delivery" className="section delivery" aria-labelledby="delivery-title">
      <div className="container delivery__grid">
        <SectionHeading
          id="delivery-title"
          eyebrow="Flora at home"
          title={
            <>
              Savour Flora <em>wherever you are</em>
            </>
          }
          intro="Craving an açaí bowl or a piping-hot Fully Loaded Burrito? Settle back and order from our delivery partners."
        />
        <ul className="delivery__links">
          {delivery.map((d) => (
            <li key={d.name}>
              <a className="delivery__card" href={d.url} target="_blank" rel="noopener noreferrer">
                <img src={`${base}images/${LOGOS[d.name]}`} alt="" width="512" height="512" loading="lazy" />
                <span className="delivery__name">Order on {d.name}</span>
                <span className="delivery__arrow" aria-hidden="true">
                  →
                </span>
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
