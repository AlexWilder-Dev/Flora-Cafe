export const venue = {
  name: 'Flora SW17',
  shortName: 'Flora',
  founded: 'December 2023',
  address: {
    unit: 'Unit 22a, Tooting Market',
    street: '21-23 Tooting High St',
    city: 'London',
    postcode: 'SW17 0SN',
  },
  directions: 'Inside Tooting Market: head down the main corridor and you’ll find us.',
  nearestTube: 'Tooting Broadway',
  email: 'info@florasw17.com',
  phone: '07946 770651',
  phoneHref: 'tel:+447946770651',
  instagram: {
    handle: '@florasw17',
    url: 'https://www.instagram.com/florasw17',
  },
  amenities: ['Dog friendly', 'Wheelchair access', 'Outdoor smoking area'],
} as const

export const fullAddress = `${venue.address.unit}, ${venue.address.street}, ${venue.address.city} ${venue.address.postcode}`

const mapsQuery = encodeURIComponent(`Flora, Tooting Market, ${venue.address.street}, London ${venue.address.postcode}`)

export const maps = {
  /** Keyless embed: the classic maps "output=embed" URL. */
  embed: `https://maps.google.com/maps?q=${mapsQuery}&z=17&output=embed`,
  link: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
}

export interface DeliveryPartner {
  name: string
  url: string
}

export const delivery: DeliveryPartner[] = [
  { name: 'Deliveroo', url: 'https://deliveroo.co.uk/menu/london/tooting/flora-tooting-market' },
  { name: 'Uber Eats', url: 'https://www.ubereats.com/gb/store/flora-cafe/qQcRX0DWXzuZfekOeHI_EA' },
]

export const smallPrint = [
  'A discretionary 12.5% service charge is added to bills over £10.',
  'Please tell our staff about any allergies before ordering.',
  'All dishes may contain traces of nuts.',
  'Pastries are available at the counter.',
]
