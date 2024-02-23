import type { ITransaction, IFormatTransactionsVisualInfo } from '@/utils/types/data/data.types'

export const getFormatTransactionsVisualInfo = (
  transactions: ITransaction[]
): IFormatTransactionsVisualInfo[] => {
  const formatData: IFormatTransactionsVisualInfo[] = []

  transactions.forEach((transaction: ITransaction) => {
    const isDateIncludes = formatData.reduce((acc, val) => {
      if (
        val.category?.id ===
          (typeof transaction.category === 'object'
            ? transaction.category?.id
            : transaction.category) &&
        val.currency?.id ===
          (typeof transaction.currency === 'object'
            ? transaction.currency?.id
            : transaction.currency)
      ) {
        val.amount += transaction.amount
        acc = true
      }

      return acc
    }, false)

    const category = typeof transaction.category === 'object' ? transaction.category : null
    const currency = typeof transaction.currency === 'object' ? transaction.currency : null

    if (!isDateIncludes) {
      formatData.push({
        id: Math.random().toString(36),
        amount: transaction.amount,
        category,
        currency,
        strokeDasharray: 0,
        strokeDashoffset: 0
      })
    }
  })

  formatData.sort((a, b) => b.amount - a.amount)

  return formatData
}
