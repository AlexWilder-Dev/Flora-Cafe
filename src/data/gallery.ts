import type { ImageName } from './images'

export interface GalleryItem {
  image: ImageName
  alt: string
  shape?: 'square' | 'tall' | 'wide'
}

export const gallery: GalleryItem[] = [{ image: 'florasw17_15', alt: 'TBD', shape: 'tall' }]
