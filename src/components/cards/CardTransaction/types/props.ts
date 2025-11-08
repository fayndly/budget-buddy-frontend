import type { TMongoObjectId, ICurrency, ICategory } from '@/utils/types/data/data.types'

export interface IPropsCardTransaction {
  id: TMongoObjectId
  name: string
  currency: ICurrency | null
  amount: number
  category: ICategory | null
}
