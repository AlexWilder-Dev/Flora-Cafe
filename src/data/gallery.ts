import { library, type Photo } from './photos'

export type GalleryItem = Photo

/** Flora's own photos, in display order (mixing daytime and evening). */
export const gallery: GalleryItem[] = [
  library.blossomRoom,
  library.salmon,
  library.latte,
  library.cocktails,
  library.benedict,
  library.counter,
  library.spread,
  library.hotChocolate,
  library.pergola,
  library.toasts,
  library.burrito,
  library.pineappleCocktail,
  library.caesar,
  library.fullFarmer,
  library.steakSandwich,
  library.blt,
  library.veggieAndWine,
]

export const showGallery = gallery.length >= 3
