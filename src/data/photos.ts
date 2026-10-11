import type { Mode } from '../lib/time'
import type { ImageName } from './images'

export interface Photo {
  image: ImageName
  alt: string
  /** CSS object-position for cropped placements. */
  position?: string
}

/**
 * Which of Flora's photos appears where. Slots set to null (or empty lists)
 * render a botanical panel in the brand palette until a matching photo is added.
 */
interface PhotoSlots {
  hero: Record<Mode, Photo>
  story: Photo | null
  dayNight: Record<Mode, Photo[]>
  bottomless: Photo[]
  evenings: Photo | null
  booking: Photo | null
}

const counter: Photo = {
  image: 'florasw17_15',
  alt: 'Flora’s counter in Tooting Market: a hand-painted FLORA sign with leaves above a wooden pergola hung with pink blossom, rattan pendant lamps and an espresso machine behind a reclaimed-wood bar.',
}

export const photos: PhotoSlots = {
  hero: {
    day: { ...counter, position: 'center 18%' },
    evening: { ...counter, position: 'center 42%' },
  },
  story: null,
  dayNight: { day: [], evening: [] },
  bottomless: [],
  evenings: { ...counter, position: 'center 40%' },
  booking: null,
}
