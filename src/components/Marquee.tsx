import { Fragment } from 'react'
import { Blossom } from './Botanical'

const WORDS = [
  'Specialty coffee',
  'Organic açaí bowls',
  'Pancakes & Benedicts',
  'Cold-press juices',
  'Spanish tapas',
  'Cocktails & sangria',
  'Live music',
  'DJ Fridays',
]

/** A slow ribbon of what Flora serves; static when reduced motion is requested. */
export function Marquee() {
  const row = (
    <span className="marquee__row">
      {WORDS.map((w) => (
        <Fragment key={w}>
          <span>{w}</span>
          <Blossom className="marquee__mark" />
        </Fragment>
      ))}
    </span>
  )
  return (
    <div className="marquee">
      <p className="visually-hidden">{WORDS.join(', ')}</p>
      <div className="marquee__track" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  )
}
