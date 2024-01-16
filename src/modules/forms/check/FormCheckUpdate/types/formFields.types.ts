import type { TMongoObjectId } from '@/utils/types/data/data.types'

export interface IFormFields {
  name: string
  currency: TMongoObjectId | null
  amount: number
}
