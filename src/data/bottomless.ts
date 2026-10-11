export interface BottomlessPackage {
  id: string
  name: string
  price: number
  drinks: string[]
}

export const BOTTOMLESS_MINUTES = 90

export const bottomlessPackages: BottomlessPackage[] = [
  {
    id: 'prosecco-beer',
    name: 'Prosecco & Beer',
    price: 29.9,
    drinks: ['Prosecco', 'Bottled beer'],
  },
  {
    id: 'house-wine',
    name: 'House Wine',
    price: 29.9,
    drinks: ['Red house wine', 'White house wine', 'Rosé house wine'],
  },
  {
    id: 'prosecco-cocktails',
    name: 'Prosecco & Cocktails',
    price: 34.9,
    drinks: ['Mojito', 'Aperol Spritz', 'Mimosa', 'Pornstar Martini', 'Prosecco', 'Bottled beer'],
  },
]

export const bottomlessIncludes = {
  day: 'One brunch main',
  evening: 'Two tapas dishes',
}

export const bottomlessRules = [
  `${BOTTOMLESS_MINUTES} minutes of free-flowing drinks, per person.`,
  'The whole table must take part.',
  'Mocktails available on request.',
]
