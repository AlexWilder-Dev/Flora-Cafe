const gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 })

export function formatPrice(value: number): string {
  return gbp.format(value)
}
