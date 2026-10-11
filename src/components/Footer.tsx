import { smallPrint, venue } from '../data/contact'
import { hoursSummary } from '../data/hours'

const base = import.meta.env.BASE_URL

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src={`${base}images/logo-flora-white.webp`} alt="Flora SW17" width="180" height="37" loading="lazy" />
          <p>Brunch by day, tapas & cocktails by night. Inside Tooting Market since {venue.founded}.</p>
          <a className="site-footer__social" href={venue.instagram.url} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
            </svg>
            {venue.instagram.handle}
            <span className="visually-hidden"> on Instagram (opens in a new tab)</span>
          </a>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__head">Visit</h2>
          <p>
            {venue.address.unit}
            <br />
            {venue.address.street}
            <br />
            {venue.address.city} {venue.address.postcode}
          </p>
          <p>
            <a href={`mailto:${venue.email}`}>{venue.email}</a>
            <br />
            <a href={venue.phoneHref}>{venue.phone}</a>
          </p>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__head">Hours</h2>
          <dl className="site-footer__hours">
            {hoursSummary.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>
                  {h.time}
                  {h.note && <span> · {h.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="site-footer__col site-footer__print">
          <h2 className="site-footer__head">Good to know</h2>
          <ul>
            {smallPrint.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="site-footer__key">
            <abbr className="diet-tag" title="Vegetarian">V</abbr> Vegetarian
            <abbr className="diet-tag" title="Vegan">VG</abbr> Vegan
          </p>
        </div>
      </div>
      <div className="container site-footer__base">
        <p>© Flora SW17</p>
        <p>Concept site with sample booking flow; no orders or bookings are taken here.</p>
      </div>
    </footer>
  )
}
