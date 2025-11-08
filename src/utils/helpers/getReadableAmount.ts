import type { ICurrency } from '../types/data/data.types'

export const getReadableAmount = (amount: number, currency: ICurrency | null) => {
  let readableAmount = ''

  readableAmount = new Intl.NumberFormat(currency?.designation || undefined, {
    notation: 'standard',
    style: currency?.name ? 'currency' : undefined,
    currency: currency?.name || undefined,
    minimumFractionDigits: 0
  }).format(amount)

  return readableAmount
}
