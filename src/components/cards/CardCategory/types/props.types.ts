import type { ICategory, ICurrency } from '@/utils/types/data/data.types'

export interface IPropsCardCategory {
  category: ICategory | null
  amount: number
  currency: ICurrency | null
}
