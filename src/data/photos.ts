import type { Mode } from '../lib/time'
import type { CategoryId } from './menu'
import type { ImageName } from './images'

export interface Photo {
  image: ImageName
  alt: string
  /** CSS object-position for cropped placements. */
  position?: string
}

/** Alt text describes what each of Flora's photos actually shows. */
export const library = {
  blt: {
    image: 'florasw17_1',
    alt: 'A toasted BLT with crispy bacon, gem lettuce and tomato on a wooden board, with two dips and a jar of juice.',
  },
  salmon: {
    image: 'florasw17_2',
    alt: 'Smoked salmon and scrambled egg on sourdough with microgreens on a blue ceramic plate, an avocado toast and a coffee behind.',
  },
  latte: {
    image: 'florasw17_3',
    alt: 'A latte with leaf latte art in a blue glazed cup, with avocado and chorizo toast behind.',
  },
  toasts: {
    image: 'florasw17_4',
    alt: 'Overhead view of avocado toast with chorizo and a poached egg, smoked salmon and scrambled egg on sourdough, smashed avocado and a matcha latte on a wooden table.',
  },
  benedict: {
    image: 'florasw17_5',
    alt: 'Eggs Benedict on English muffins under orange hollandaise with sun-dried tomato, a green smoothie in a jar behind.',
  },
  caesar: {
    image: 'florasw17_6',
    alt: 'Overhead view of a Caesar salad with grilled chicken and a poached egg on a blue plate, beside a green juice in a glass jar.',
  },
  hotChocolate: {
    image: 'florasw17_7',
    alt: 'Two hot chocolates topped with whipped cream and marshmallows on turquoise saucers.',
  },
  burrito: {
    image: 'florasw17_8',
    alt: 'A breakfast burrito cut in half to show egg, chorizo and sausage, with fries in a wire basket on a wooden board.',
  },
  fullFarmer: {
    image: 'florasw17_9',
    alt: 'Overhead view of a full breakfast with bacon, sausages, beans, eggs, mushrooms and tomatoes beside a dish of sofrito with chorizo and poached eggs, toast, a beer and red wine.',
  },
  veggieAndWine: {
    image: 'florasw17_10',
    alt: 'A veggie breakfast plate of scrambled egg, mushrooms, beans, hash browns, cherry tomatoes and toast, with a glass of red wine and a pint of Stella Artois.',
  },
  steakSandwich: {
    image: 'florasw17_11',
    alt: 'A rib-eye steak sandwich on sourdough with rocket, fries in a wire basket and a pint of Stella Artois Unfiltered, fairy lights behind.',
  },
  spread: {
    image: 'florasw17_12',
    alt: 'Overhead spread of Flora’s brunch dishes: a full breakfast, ranchera, Caesar salad, toasties, a steak sandwich, fries, dips, juices and shakes.',
  },
  cocktails: {
    image: 'florasw17_13',
    alt: 'Four cocktails lined up on a wooden bar, garnished with pineapple, lime and lemon, with neon and fairy lights behind.',
  },
  pineappleCocktail: {
    image: 'florasw17_14',
    alt: 'A pineapple cocktail in a large wine glass with a pineapple wedge and leaves, lime on the side.',
  },
  counter: {
    image: 'florasw17_15',
    alt: 'Flora’s counter in Tooting Market: a hand-painted FLORA sign above a pergola hung with pink blossom, rattan pendant lamps and a reclaimed-wood bar.',
  },
  blossomRoom: {
    image: 'florasw17_17',
    alt: 'Flora at night: pink blossom trees and glowing rattan pendant lamps over marble tables and red rattan bistro chairs.',
  },
  pergola: {
    image: 'florasw17_18',
    alt: 'Rattan pendant lamps glowing under a wooden pergola covered in pink blossom, with trailing greenery.',
  },
  spreadPortrait: {
    image: 'about',
    alt: 'Overhead spread of brunch at Flora: a full breakfast, a sofrito with chorizo and poached egg, toasties, dips and a green shake on a wooden table.',
  },
} satisfies Record<string, Photo>

interface PhotoSlots {
  hero: Record<Mode, Photo>
  story: Photo
  dayNight: Record<Mode, Photo>
  bottomless: Photo
  evenings: Photo[]
  booking: Photo
}

export const photos: PhotoSlots = {
  hero: {
    day: library.spreadPortrait,
    evening: { ...library.blossomRoom, position: 'center 30%' },
  },
  story: library.counter,
  dayNight: { day: library.toasts, evening: library.pergola },
  bottomless: library.veggieAndWine,
  evenings: [library.cocktails, library.steakSandwich, library.pineappleCocktail],
  booking: library.salmon,
}

/** A photo for menu sections where one of Flora's shots shows that food. */
export const menuPhotos: Partial<Record<CategoryId, Photo>> = {
  breakfast: library.blt,
  benedicts: library.benedict,
  brunch: library.fullFarmer,
  coffee: library.hotChocolate,
  cocktails: library.cocktails,
}
