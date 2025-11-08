import type { ITransaction, IFormatTransactionsList } from '@/utils/types/data/data.types'

const translateMonth = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря'
]

export const getFormatTransactionsList = (
  transactions: ITransaction[]
): IFormatTransactionsList[] => {
  const formatTransactions: IFormatTransactionsList[] = []

  transactions.forEach((transaction: ITransaction) => {
    const transactionTime = new Date(transaction.time)
    const transactionFormatTime = `${transactionTime.getDate()} ${
      translateMonth[transactionTime.getMonth()]
    }`

    const formatTransaction: ITransaction = transaction

    const isDateIncludes = formatTransactions.reduce((acc, val) => {
      if (val.date === transactionFormatTime) {
        val.transactions.push(formatTransaction)
        acc = true
      }

      return acc
    }, false)

    if (!isDateIncludes) {
      formatTransactions.push({ date: transactionFormatTime, transactions: [formatTransaction] })
    }
  })

  return formatTransactions
}
