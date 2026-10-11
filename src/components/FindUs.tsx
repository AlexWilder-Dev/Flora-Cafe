import { fullAddress, maps, venue } from '../data/contact'
import { openingHours } from '../data/hours'
import { useLondonClock } from '../hooks/useLondonClock'
import { openStatus } from '../lib/time'
import { SectionHeading } from './SectionHeading'

export function FindUs() {
  const now = useLondonClock()
  const status = openStatus(now)

  return (
    <section id="find-us" className="section find-us" aria-labelledby="find-title">
      <div className="container find-us__grid">
        <div className="find-us__info">
          <SectionHeading id="find-title" eyebrow="Find us" title="Inside Tooting Market" />
          <address className="find-us__address">
            <span>{venue.address.unit}</span>
            <span>{venue.address.street}</span>
            <span>
              {venue.address.city} {venue.address.postcode}
            </span>
          </address>
          <p className="find-us__directions">{venue.directions}</p>
          <p className="find-us__tube">
            <span className="tube-roundel" aria-hidden="true" />
            Nearest tube: <strong>{venue.nearestTube}</strong>
          </p>

          <ul className="find-us__contact">
            <li>
              <a href={`mailto:${venue.email}`}>{venue.email}</a>
            </li>
            <li>
              <a href={venue.phoneHref}>{venue.phone}</a>
            </li>
            <li>
              <a href={maps.link} target="_blank" rel="noopener noreferrer">
                Open in Google Maps<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>

          <ul className="amenities" aria-label="Good to know">
            {venue.amenities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="find-us__hours">
          <h3 className="find-us__subhead">
            Opening hours
            <span className={`status-pill${status.open ? ' is-open' : ''}`}>{status.label}</span>
          </h3>
          <table className="hours-table">
            <caption className="visually-hidden">Opening hours, London time</caption>
            <tbody>
              {openingHours.map((d) => {
                const today = d.day === now.day
                return (
                  <tr key={d.day} className={today ? 'is-today' : undefined} aria-current={today ? 'date' : undefined}>
                    <th scope="row">
                      {d.name}
                      {today && <span className="hours-table__today">Today</span>}
                    </th>
                    <td>
                      {d.open} – {d.close}
                      {d.lateBar && <span className="hours-table__late">Late bar</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="find-us__map">
          <iframe
            title={`Map showing Flora at ${fullAddress}`}
            src={maps.embed}
            width="600"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
