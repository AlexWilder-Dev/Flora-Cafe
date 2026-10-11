import type { ImageName } from './images'

export interface GalleryItem {
  image: ImageName
  alt: string
  shape?: 'square' | 'tall' | 'wide'
}

/** Flora's own photos, in display order. Alt text describes what each photo shows. */
export const gallery: GalleryItem[] = [
  {
    image: 'florasw17_15',
    alt: 'Flora’s counter under the hand-painted FLORA sign, with pink blossom, rattan pendant lamps and a reclaimed-wood bar.',
    shape: 'tall',
  },
]

/** The gallery section only appears once there are enough photos to make a grid. */
export const showGallery = gallery.length >= 3
