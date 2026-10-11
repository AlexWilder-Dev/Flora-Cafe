import type { ImageName } from './images'

interface Photo {
  image: ImageName
  alt: string
  position?: string
}

const p: Photo = { image: 'florasw17_15', alt: 'TBD' }

export const photos = {
  hero: { day: p, evening: p } satisfies Record<'day' | 'evening', Photo>,
  story: p,
  dayNight: { day: [p, p], evening: [p, p] } satisfies Record<'day' | 'evening', Photo[]>,
  bottomless: [p, p],
  evenings: p,
  booking: p,
}
