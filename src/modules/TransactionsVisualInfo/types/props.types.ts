import type {
  ICurrency,
  IFormatTransactionsVisualInfo,
  TTypeTransaction
} from '@/utils/types/data/data.types'

export interface IPropsTransactionsVisualInfo {
  formatTransactions: IFormatTransactionsVisualInfo[]
  typeTransactions: TTypeTransaction
  currencyCheck: ICurrency | null
  isLoading: boolean
}
