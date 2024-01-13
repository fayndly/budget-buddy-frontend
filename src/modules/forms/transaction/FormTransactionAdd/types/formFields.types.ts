import type { TTypeTransaction, TMongoObjectId } from '@/utils/types/data/data.types'

export interface IFormFields {
  name: string
  type: TTypeTransaction | null
  currency: TMongoObjectId | null
  amount: number
  check: TMongoObjectId | null
  category: TMongoObjectId | null
  time: Date | null
  description: string
}
