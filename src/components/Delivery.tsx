import { delivery } from '../data/contact'
import { SectionHeading } from './SectionHeading'

export function Delivery() {
  return (
    <section id="delivery" className="section delivery" aria-labelledby="delivery-title">
      <div className="container delivery__inner">
        <SectionHeading
          id="delivery-title"
          eyebrow="Order at home"
          title="Flora, delivered"
          intro="Brunch favourites brought to your door across Tooting."
          align="center"
        />
        <ul className="delivery__links">
          {delivery.map((d) => (
            <li key={d.name}>
              <a className="btn btn--outline btn--lg" href={d.url} target="_blank" rel="noopener noreferrer">
                Order on {d.name}
                <span className="visually-hidden"> (opens in a new tab)</span>
                <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
                  <path d="M5 3h8v8M13 3 3 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
