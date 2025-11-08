import type {
  TTypeTransaction,
  IFormatTransactionsVisualInfo,
  ICurrency
} from '@/utils/types/data/data.types'

export interface IPropsGrathDiagram {
  data: IFormatTransactionsVisualInfo[]
  typeTransactions: TTypeTransaction
  currencyCheck: ICurrency | null
}
