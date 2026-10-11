/**
 * Flora's menu, transcribed from florasw17.com with spelling fixed.
 * Prices in GBP. Add-on prices are the surcharge.
 */

export type Diet = 'V' | 'VG'

export interface AddOn {
  name: string
  price?: number
}

export interface PricePoint {
  label: string
  price: number
}

export interface MenuItem {
  name: string
  description?: string
  diet?: Diet
  /** Single price. Omitted when the group sets one price for all items. */
  price?: number
  /** Several sizes, e.g. glass / bottle. */
  prices?: PricePoint[]
  note?: string
  addOns?: AddOn[]
}

export interface MenuGroup {
  title?: string
  /** One price for every item in the group. */
  price?: number
  priceLabel?: string
  note?: string
  items: MenuItem[]
  /** Extras shown as chips without prices. */
  extras?: { name: string; detail?: string }[]
}

export type CategoryId =
  | 'breakfast'
  | 'pancakes'
  | 'benedicts'
  | 'brunch'
  | 'acai'
  | 'tapas'
  | 'coffee'
  | 'juices'
  | 'cocktails'
  | 'beer-wine'
  | 'specials'
  | 'kids'

export interface MenuCategory {
  id: CategoryId
  label: string
  service: 'day' | 'evening' | 'drinks'
  intro?: string
  groups: MenuGroup[]
}

const hashBrownsOrFries: AddOn[] = [
  { name: 'Two hash browns', price: 3.5 },
  { name: 'Homestyle fries', price: 3.5 },
]

const acaiToppings: AddOn[] = [
  { name: 'Peanut butter', price: 1 },
  { name: 'Milk powder', price: 1 },
  { name: 'Whey protein', price: 2 },
  { name: 'Condensed milk', price: 1 },
  { name: 'Honey', price: 1 },
  { name: 'Toasted coconut flakes', price: 1 },
]

const saladAddOns: AddOn[] = [
  { name: 'Free-range chicken thighs', price: 3 },
  { name: 'Crispy bacon', price: 1.5 },
  { name: 'Avocado', price: 2 },
  { name: 'Smoked salmon', price: 3.5 },
  { name: 'Poached egg', price: 1.5 },
]

export const menu: MenuCategory[] = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    service: 'day',
    intro: 'Served until 4pm.',
    groups: [
      {
        items: [
          {
            name: 'Smashed Avocado on Toast',
            diet: 'VG',
            price: 9,
            description: 'Smashed avocado, mojo picón & spring onion on toasted sourdough.',
            addOns: [
              { name: 'Chorizo', price: 2.5 },
              { name: 'Halloumi', price: 2.5 },
              { name: 'Poached egg', price: 1.5 },
              { name: 'Crispy bacon', price: 1.5 },
              { name: 'Homestyle fries', price: 3.5 },
            ],
          },
          {
            name: 'Maya Egg Drop Toast',
            diet: 'V',
            price: 10.5,
            description: 'Soft scrambled eggs, Swiss cheese and our homemade garlic mayo in a brioche toast.',
            addOns: [
              { name: 'Smashed avocado', price: 2 },
              { name: 'Crispy bacon', price: 1.5 },
              { name: 'Homestyle fries', price: 3.5 },
            ],
          },
          {
            name: 'Smoked Salmon & Scrambled Egg',
            price: 11.5,
            description: 'Soft scrambled eggs and smoked salmon on toasted sourdough with a light layer of cream cheese.',
            addOns: [
              { name: 'Smashed avocado', price: 2 },
              { name: 'Halloumi', price: 2.5 },
              { name: 'Crispy bacon', price: 1.5 },
              { name: 'Homestyle fries', price: 3.5 },
            ],
          },
          {
            name: 'The Toast BLT',
            price: 9,
            description: 'Smoked streaky bacon, gem lettuce, sliced plum tomatoes and rosemary garlic mayo.',
            addOns: [
              { name: 'Smashed avocado', price: 2 },
              { name: 'Free-range chicken thighs', price: 2.5 },
              { name: 'Swiss cheese', price: 1 },
              { name: 'Homestyle fries', price: 3.5 },
            ],
          },
        ],
      },
      {
        title: 'Sides',
        price: 3.5,
        priceLabel: 'each',
        items: [
          { name: 'Streaky Bacon' },
          { name: 'Herbed Sausages' },
          { name: 'Chorizo' },
          { name: 'Halloumi Fries', diet: 'V' },
          { name: 'Grilled Halloumi', diet: 'V' },
          { name: 'Extra Eggs ×2', diet: 'V' },
          { name: 'Smashed Avocado', diet: 'VG' },
          { name: 'Mushrooms', diet: 'VG' },
          { name: 'Baked Beans', diet: 'VG' },
          { name: 'Hash Browns', diet: 'VG' },
          { name: 'Vegan Sausage', diet: 'VG' },
          { name: 'Sourdough Toast', diet: 'VG' },
          { name: 'Homestyle Fries', diet: 'VG' },
        ],
      },
    ],
  },
  {
    id: 'pancakes',
    label: 'Pancakes & French Toast',
    service: 'day',
    groups: [
      {
        items: [
          {
            name: 'Crazy Berries Buttermilk Pancakes',
            price: 11.5,
            description:
              'Homemade buttermilk pancakes, berry compote, mascarpone, maple syrup, fresh berries and vanilla ice cream.',
            addOns: [{ name: 'Crispy bacon', price: 1.5 }],
          },
          {
            name: 'Dulce de Leche Buttermilk Pancakes',
            price: 11.5,
            description:
              'Homemade buttermilk pancakes, fresh banana, Argentinian dulce de leche sauce, mascarpone and vanilla ice cream.',
            addOns: [{ name: 'Crispy bacon', price: 1.5 }],
          },
          {
            name: 'French Toast',
            price: 11.5,
            description: 'Three slices of eggy brioche with cinnamon, maple syrup, seasonal berries and whipped cream.',
            addOns: [
              { name: 'Crispy bacon', price: 1.5 },
              { name: 'Ice cream', price: 1.5 },
              { name: 'Dulce de leche', price: 1 },
              { name: 'Banana', price: 1 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'benedicts',
    label: 'Benedicts',
    service: 'day',
    groups: [
      {
        items: [
          {
            name: 'Eggs Benedict',
            price: 11.95,
            description: 'Crispy bacon, poached eggs & hollandaise on an English muffin.',
            addOns: hashBrownsOrFries,
          },
          {
            name: 'Eggs Royale',
            price: 13.5,
            description: 'Smoked salmon, rocket, poached eggs & hollandaise on an English muffin.',
            addOns: hashBrownsOrFries,
          },
          {
            name: 'Flora Benedict',
            diet: 'V',
            price: 12.5,
            description:
              'Grilled halloumi, sun-dried tomatoes, avocado, poached eggs & chipotle hollandaise on an English muffin.',
            addOns: hashBrownsOrFries,
          },
        ],
      },
    ],
  },
  {
    id: 'brunch',
    label: 'Brunch Specials',
    service: 'day',
    groups: [
      {
        items: [
          {
            name: 'Flora Ranchera',
            diet: 'V',
            price: 12.95,
            description:
              'Sizzling sofrito (tomato, pepper and onion sauce) with beans and a poached egg, with sliced toasted sourdough.',
            addOns: [{ name: 'Smashed avocado', price: 2 }, { name: 'Chorizo', price: 2.5 }, { name: 'Parmesan cheese' }],
          },
          {
            name: 'Fully Loaded Burrito',
            price: 13.5,
            description:
              'Streaky smoked bacon, sausage, chorizo, mushrooms, spinach, pico de gallo, poached egg, avocado, cheese and house rosemary mayo. Served with homestyle fries.',
          },
          {
            name: 'The Full Farmer',
            price: 15,
            description:
              'Poached, fried or scrambled eggs, streaky smoked bacon, sausage, portobello mushrooms, hash browns, baked beans, roasted cherry vine tomatoes & sourdough toast.',
            addOns: [{ name: 'Homestyle fries', price: 3.5 }],
          },
          {
            name: 'The Full Veggie',
            diet: 'V',
            price: 13,
            description:
              'Poached, fried or scrambled eggs, veggie sausage, portobello mushrooms, hash browns, baked beans, roasted cherry vine tomatoes & sourdough toast.',
            addOns: [
              { name: 'Homestyle fries', price: 3.5 },
              { name: 'Smashed avocado', price: 2 },
            ],
          },
          {
            name: 'Rib-Eye Sandwich',
            price: 14,
            description:
              'Argentinian rib-eye steak, rocket, sliced plum tomatoes, rosemary & garlic mayonnaise and chimichurri in sourdough, with fries.',
            addOns: [
              { name: 'Crispy bacon', price: 1.5 },
              { name: 'Swiss cheese', price: 1 },
            ],
          },
          {
            name: 'Caesar Salad',
            diet: 'V',
            price: 9,
            description: 'Romaine lettuce, cherry tomatoes, garlic croutons, parmesan and homemade Caesar dressing.',
            addOns: saladAddOns,
          },
        ],
      },
    ],
  },
  {
    id: 'acai',
    label: 'Açaí Bowls',
    service: 'day',
    intro: 'Amazon organic açaí, topped to order.',
    groups: [
      {
        items: [
          {
            name: 'Copacabana Açaí Bowl',
            diet: 'VG',
            price: 9.5,
            description: 'Amazon organic açaí, banana, strawberry & granola.',
            addOns: acaiToppings,
          },
          {
            name: 'Very Berry Açaí Bowl',
            diet: 'VG',
            price: 9.5,
            description: 'Amazon organic açaí, blueberry, raspberry, strawberry & granola.',
            addOns: acaiToppings,
          },
          {
            name: 'Super Nutty Açaí Bowl',
            diet: 'VG',
            price: 9.5,
            description: 'Amazon organic açaí, banana, strawberry, peanut butter & granola.',
            addOns: acaiToppings.filter((a) => a.name !== 'Peanut butter'),
          },
        ],
      },
    ],
  },
  {
    id: 'tapas',
    label: 'Tapas',
    service: 'evening',
    intro: 'Spanish plates to share, Thursday to Saturday evenings.',
    groups: [
      {
        items: [
          {
            name: 'Pan con Tomate / Ajo',
            diet: 'VG',
            price: 4,
            description: 'Toasted bread topped with fresh grated tomato & garlic olive oil.',
          },
          { name: 'Aceitunas', diet: 'VG', price: 4, description: 'Marinated mixed olives.' },
          {
            name: 'Patatas Bravas',
            diet: 'VG',
            price: 6,
            description: 'Deep-fried potatoes with alioli and salsa brava.',
          },
          { name: 'Padrón', diet: 'VG', price: 5.5, description: 'Small green peppers from Galicia.' },
          { name: 'Croquetas de Chorizo y Huevo', price: 7.5, description: 'Chorizo and egg croquettes.' },
          { name: 'Croquetas de Jamón Ibérico', price: 7.5, description: 'Ibérico ham croquettes.' },
          { name: 'Croquetas de Boletus', diet: 'V', price: 7.5, description: 'Porcini croquettes.' },
          {
            name: 'Gambas al Ajillo',
            price: 9,
            description: 'Prawns in olive oil, garlic and dried hot chilli.',
          },
          { name: 'Chorizo al Vino Tinto', price: 7.5, description: 'Spanish chorizo in red wine.' },
          {
            name: 'Ribeye con Rúcula y Manchego',
            price: 15,
            description: 'Ribeye steak with rocket & Manchego cheese.',
          },
          {
            name: 'Tabla de Quesos con Mermelada y Pan',
            price: 15.5,
            description: 'A selection of four Spanish cheeses, served with blueberry jam & bread.',
          },
          {
            name: 'Chuleta de Cordero',
            price: 12.5,
            description: 'Two grilled lamb cutlets with yoghurt sauce.',
          },
          { name: 'Alitas de Pollo', price: 7.5, description: 'Grilled peri peri chicken wings.' },
          {
            name: 'Churros',
            diet: 'V',
            price: 6.5,
            description: 'Traditional Spanish churros with dulce de leche sauce.',
          },
        ],
      },
    ],
  },
  {
    id: 'coffee',
    label: 'Coffee & Tea',
    service: 'drinks',
    groups: [
      {
        title: 'Coffee',
        items: [
          { name: 'Espresso', price: 3 },
          { name: 'Long Black', price: 3 },
          { name: 'Macchiato', price: 3 },
          { name: 'Cortado', price: 3 },
          { name: 'Flat White', price: 3.3 },
          { name: 'Latte', price: 3.3 },
          { name: 'Cappuccino', price: 3.3 },
          { name: 'Mocha', price: 3.5 },
          { name: 'Hot Chocolate', price: 3.5 },
          { name: 'Chai Latte', price: 3.5 },
          { name: 'Matcha', price: 4 },
        ],
        extras: [
          { name: 'Extra shot' },
          { name: 'Alternative milk', detail: 'Oat / Almond / Coconut / Soy' },
          { name: 'Syrups', detail: 'Vanilla / Caramel / Hazelnut' },
          { name: 'Make it large' },
        ],
      },
      {
        title: 'Over ice',
        items: [
          { name: 'Iced Latte', price: 4 },
          { name: 'Iced Americano', price: 3.8 },
          { name: 'Iced Cappuccino', price: 4 },
          { name: 'Iced Chai Latte', price: 4.2 },
          { name: 'Iced Chocolate', price: 3.3 },
        ],
      },
      {
        title: 'Flora specials',
        items: [
          {
            name: 'Flora Hot Chocolate',
            price: 5,
            description: 'Spanish-style thick and creamy chocolate topped with marshmallows.',
            addOns: [{ name: 'Baileys', price: 4 }],
          },
          { name: 'Gingerbread Latte', price: 4.3, description: 'Espresso, gingerbread syrup and milk.' },
        ],
      },
      {
        title: 'Tea',
        items: [
          {
            name: 'Pot of Tea',
            price: 3.5,
            description: 'English Breakfast, Earl Grey, Green, Fresh Mint or Seasonal Herbal.',
          },
        ],
      },
    ],
  },
  {
    id: 'juices',
    label: 'Juices & Smoothies',
    service: 'drinks',
    groups: [
      {
        title: 'Cold-press juices',
        items: [
          { name: 'Everyday Green', price: 5.2, description: 'Cucumber, apple, ginger, lemon and spinach.' },
          {
            name: 'Hangover Killer',
            price: 5.2,
            description: 'Pineapple, celery, apple & our signature lemon and ginger shot.',
          },
          { name: 'Orange', price: 4.2 },
          { name: 'Apple', price: 4.2 },
          { name: 'Passion Fruit', price: 4.2 },
          { name: 'Pineapple', price: 4.2 },
          { name: 'Guava', price: 4.2 },
        ],
      },
      {
        title: 'Açaí smoothies',
        items: [
          { name: 'Amazon Power', price: 7.2, description: 'Açaí, strawberry & banana, almond milk.' },
          { name: 'Sunrise', price: 7.2, description: 'Açaí, summer berries, almond milk.' },
          {
            name: 'Morning Power',
            price: 7.2,
            description: 'Açaí, peanut butter, whey protein & banana, almond milk.',
          },
        ],
      },
      {
        title: 'Shakes & smoothies',
        items: [
          { name: 'Avo Shake', price: 6.5, description: 'Avocado, ice, banana, coconut milk.' },
          { name: 'Power Shake', price: 6.5, description: 'Banana, ice, strawberries, coconut milk.' },
          {
            name: 'Peanut Butter Cup',
            price: 7,
            description: 'Coconut milk, peanut butter, peanut powder, banana.',
          },
          { name: 'Fruit & Berry Mix', price: 6.5, description: 'Fresh orange juice, strawberry, banana.' },
        ],
      },
      {
        title: 'Soft drinks',
        items: [
          { name: 'Coke / Diet Coke', price: 3 },
          { name: 'Still / Sparkling Water', price: 3 },
          { name: 'San Pellegrino Limonata', price: 3 },
          { name: 'Appletiser', price: 3 },
        ],
      },
    ],
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
    service: 'evening',
    groups: [
      {
        price: 9.5,
        priceLabel: 'each',
        items: [
          { name: 'Flora Colada', description: 'White rum, coconut syrup, coconut milk & pineapple juice.' },
          { name: 'Espresso Martini', description: 'Vodka, Kahlúa, espresso, vanilla syrup.' },
          { name: 'Baileys Espresso Martini', description: 'Baileys, vodka, Kahlúa & espresso.' },
          { name: 'Pornstar Martini', description: 'Vodka, Passoã, lime juice, passion fruit, vanilla syrup & Prosecco.' },
          { name: 'Aperol Spritz', description: 'Aperol, Prosecco, soda water & a slice of fresh orange.' },
          { name: 'Mimosa', description: 'Sparkling wine and cold-pressed orange juice.' },
          {
            name: 'Bloody Mary',
            description:
              'Vodka, tomato juice, lemon juice, Tabasco & spices, Worcestershire, garnished with celery & rosemary.',
          },
          { name: 'Mojito', description: 'White rum, lime juice, sugar and soda.', note: 'Lime, strawberry or passion fruit' },
          {
            name: 'Margarita',
            description: 'Tequila, triple sec, fresh lime juice, agave syrup.',
            note: 'Lime, strawberry or passion fruit',
          },
          {
            name: 'Caipirinha',
            description: 'Velho Barreiro cachaça, lime juice & sugar.',
            note: 'Lime, strawberry or passion fruit',
          },
          { name: 'Pisco Sour', description: 'Pisco, lime juice, sugar, egg white & Angostura bitters.' },
          { name: 'Gin Fizz', description: 'Gin, lemon juice, sugar & egg white.' },
          { name: 'Negroni', description: 'Campari, vermouth & gin.' },
          { name: 'Old Fashioned', description: 'Bourbon whiskey, brown sugar, Angostura bitters.' },
          { name: 'Sex on the Beach', description: 'Vodka, peach schnapps, cranberry juice & orange juice.' },
        ],
      },
    ],
  },
  {
    id: 'beer-wine',
    label: 'Beer, Wine & Shots',
    service: 'evening',
    groups: [
      {
        title: 'Wine & fizz',
        items: [
          {
            name: 'Sauvignon Blanc',
            note: 'Chile',
            prices: [
              { label: 'Glass', price: 7 },
              { label: 'Bottle', price: 25 },
            ],
          },
          {
            name: 'Rioja Tempranillo',
            note: 'Spain',
            prices: [
              { label: 'Glass', price: 8 },
              { label: 'Bottle', price: 28 },
            ],
          },
          {
            name: 'Tempranillo Rosado',
            note: 'Spain',
            prices: [
              { label: 'Glass', price: 7 },
              { label: 'Bottle', price: 28 },
            ],
          },
          {
            name: 'Prosecco',
            note: 'Italy',
            prices: [
              { label: 'Glass', price: 7 },
              { label: 'Bottle', price: 28 },
            ],
          },
        ],
      },
      {
        title: 'Beer & cider',
        items: [
          { name: 'Corona Extra Draught', note: 'ABV 4.5%', prices: [{ label: 'Pint', price: 6.2 }] },
          { name: 'Stella Artois Unfiltered Draught', note: 'ABV 5%', prices: [{ label: 'Pint', price: 6.2 }] },
          { name: 'Camden Town Pale Ale', note: 'ABV 4%', prices: [{ label: 'Can', price: 4 }] },
          { name: 'Corona Cero', note: 'ABV 0%', prices: [{ label: 'Bottle', price: 4.2 }] },
          {
            name: 'Kopparberg Cider',
            note: 'ABV 4%',
            description: 'Mixed fruit, apple, strawberry & lime.',
            prices: [{ label: 'Bottle', price: 5 }],
          },
        ],
      },
      {
        title: 'Shots',
        price: 4,
        priceLabel: 'each',
        items: [{ name: 'Tequila' }, { name: 'Tequila Rose' }, { name: 'Coffee Tequila' }, { name: 'Jägermeister' }],
      },
    ],
  },
  {
    id: 'specials',
    label: 'Specials',
    service: 'day',
    groups: [
      {
        items: [
          {
            name: 'Falafel & Halloumi Wrap',
            price: 11.5,
            description:
              'Falafel, grilled halloumi, mixed green salad, sliced plum tomatoes, red onions, garlic mayo and fries.',
            addOns: [
              { name: 'Smashed avocado', price: 2 },
              { name: 'Free-range chicken thighs', price: 2.5 },
              { name: 'Crispy bacon', price: 1.5 },
              { name: 'Chorizo', price: 2.5 },
            ],
          },
          {
            name: 'Chicken Wrap',
            price: 12.5,
            description:
              'Free-range grilled chicken thigh, mixed green salad, sliced plum tomatoes, red onions, garlic mayo and fries.',
            addOns: [
              { name: 'Smashed avocado', price: 2 },
              { name: 'Halloumi', price: 2.5 },
              { name: 'Crispy bacon', price: 1.5 },
              { name: 'Chorizo', price: 2.5 },
            ],
          },
          {
            name: 'Chicken Sandwich',
            price: 12.95,
            description:
              'Free-range grilled chicken thigh, rocket, sliced plum tomato, garlic mayo and chimichurri in sourdough, with fries.',
            addOns: [
              { name: 'Crispy bacon', price: 1.5 },
              { name: 'Swiss cheese', price: 1 },
              { name: 'Smashed avocado', price: 2 },
              { name: 'Halloumi', price: 2.5 },
            ],
          },
          {
            name: 'Omelette',
            price: 7.5,
            description:
              'Three free-range eggs with two fillings of your choice: onion, tomato, mushroom, spinach, cheese or bacon. Served with salad and toasted sourdough.',
            addOns: [
              { name: 'Crispy bacon', price: 1.5 },
              { name: 'Mushroom', price: 1 },
              { name: 'Chorizo', price: 2.5 },
              { name: 'Halloumi', price: 2.5 },
              { name: 'Cheese', price: 1 },
              { name: 'Tomato', price: 1 },
            ],
          },
          {
            name: 'Greek Salad',
            price: 9,
            description: 'Mixed leaves, cucumber, Greek feta, fresh tomato, onions & olives.',
            addOns: saladAddOns,
          },
          {
            name: 'Tiramisu',
            price: 6.5,
            description: 'Savoiardi biscuits dipped in espresso, mascarpone and cocoa.',
            addOns: [{ name: 'Vanilla ice cream', price: 1.5 }],
          },
        ],
      },
    ],
  },
  {
    id: 'kids',
    label: 'Kids',
    service: 'day',
    groups: [
      {
        items: [
          {
            name: 'Chicken Nuggets',
            price: 6.95,
            description: 'Six chicken nuggets, fries, apple juice & vanilla ice cream.',
          },
          {
            name: 'Chicken Goujons',
            price: 6.95,
            description: 'Four chicken goujons, fries, apple juice & vanilla ice cream.',
          },
          {
            name: 'Crazy Berries Kids Pancake',
            price: 5.95,
            description: 'Buttermilk pancakes, berry compote, mascarpone, maple syrup, fresh berries & vanilla ice cream.',
          },
          {
            name: 'Dulce de Leche Kids Pancake',
            price: 5.95,
            description: 'Buttermilk pancakes, dulce de leche, banana, mascarpone, maple syrup & vanilla ice cream.',
          },
        ],
      },
    ],
  },
]

export const menuNotes = [
  'V Vegetarian · VG Vegan',
  'Pastries & other goodies available at the counter.',
  'Please tell a member of staff about any allergies; allergen info is available on request.',
  'Counter items may arrive separately during your meal.',
  'All dishes may contain traces of nuts.',
  'A 12.5% discretionary service charge is added to bills over £10. Prices include VAT.',
]

export function findItem(category: CategoryId, name: string): MenuItem {
  const item = menu
    .find((c) => c.id === category)
    ?.groups.flatMap((g) => g.items)
    .find((i) => i.name === name)
  if (!item) throw new Error(`Menu item not found: ${category}/${name}`)
  return item
}

/** Dishes surfaced in the hero for each mode. */
export const featured = {
  day: [
    { category: 'acai', name: 'Copacabana Açaí Bowl' },
    { category: 'pancakes', name: 'Crazy Berries Buttermilk Pancakes' },
    { category: 'breakfast', name: 'Maya Egg Drop Toast' },
  ],
  evening: [
    { category: 'tapas', name: 'Gambas al Ajillo' },
    { category: 'tapas', name: 'Patatas Bravas' },
    { category: 'cocktails', name: 'Pornstar Martini' },
  ],
} satisfies Record<'day' | 'evening', { category: CategoryId; name: string }[]>
