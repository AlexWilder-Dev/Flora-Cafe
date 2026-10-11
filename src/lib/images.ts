import type { ImageName } from '../data/images'

const base = import.meta.env.BASE_URL

export function imageUrl(name: ImageName, width?: number) {
  return `${base}images/${width ? `${name}-${width}` : name}.webp`
}
