import type { ITransaction, ICategory, ICurrency } from '@/utils/types/data/data.types'

const translateMonth = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
]

import { categories } from '../services/useGetCategories'
import { currencies } from '../services/useGetCurrencies'

import { getById } from '@/utils/helpers/getById'

export interface formatTransactions {
  date: string
  transactions: formatTransaction[]
}

export interface formatTransaction extends Omit<ITransaction, 'currency' | 'category'> {
  category: ICategory | null
  currency: ICurrency | null
}

export const getFormatTransactionsList = (transactions: ITransaction[]): formatTransactions[] => {
  const formatTransactions: formatTransactions[] = []

  transactions.forEach((transaction: ITransaction) => {
    const transactionTime = new Date(transaction.time)
    const transactionFormatTime = `${transactionTime.getDate()} ${
      translateMonth[transactionTime.getMonth()]
    }`

    const formatTransaction: formatTransaction = { ...transaction, category: null, currency: null }

    formatTransaction.category = getById<ICategory>(categories, transaction.category)
    formatTransaction.currency = getById<ICurrency>(currencies, transaction.currency)

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
