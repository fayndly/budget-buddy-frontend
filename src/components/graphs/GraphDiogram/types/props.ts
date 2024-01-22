import type { ICategory, TTypeTransaction } from '@/utils/types/data/data.types'

export interface IFormatData {
  amount: number
  category: ICategory | null
  strokeDasharray: number
  strokeDashoffset: number
}

export interface IPropsGrathDiagram {
  data: IFormatData[]
  typeTransactions: TTypeTransaction
}
