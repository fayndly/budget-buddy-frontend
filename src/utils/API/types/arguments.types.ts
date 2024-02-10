import type { TMongoObjectId, TTypeTransaction } from '@/utils/types/data/data.types'

interface IArgumentsDataAuth {
  email: string
  password: string
}
export interface IArgumentsDataAuthLogin extends IArgumentsDataAuth {}

export interface IArgumentsDataAuthSignup extends IArgumentsDataAuth {
  userName: string
}

export interface IArgumentsDataCheckAdd {
  name: string
  amount: number
  currency: TMongoObjectId
}
export interface IArgumentsDataCheckUpdate extends Omit<IArgumentsDataCheckAdd, 'amount'> {}

export interface IArgumentsDataCategoryAdd {
  name: string
  type: TTypeTransaction
  color: string
  icon?: string | null
}
export interface IArgumentsDataCategoryUpdate extends IArgumentsDataCategoryAdd {}

export interface IArgumentsDataTransactionAdd {
  type: TTypeTransaction
  name: string
  currency: TMongoObjectId
  amount: number
  check: TMongoObjectId
  category: TMongoObjectId
  time: string
  description?: string
}
export interface IArgumentsDataTransactionUpdate extends IArgumentsDataTransactionAdd {}
