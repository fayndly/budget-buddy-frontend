import type { TMongoObjectId, TTypeTransaction } from '@/utils/types/data/data.types'

type TNullable<T> = T | null

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
  currency: TNullable<TMongoObjectId>
}
export interface IArgumentsDataCheckUpdate extends Omit<IArgumentsDataCheckAdd, 'amount'> {}

export interface IArgumentsDataCategoryAdd {
  name: string
  type: TNullable<TTypeTransaction>
  color: TNullable<string>
  icon?: TNullable<string>
}
export interface IArgumentsDataCategoryUpdate extends IArgumentsDataCategoryAdd {}

export interface IArgumentsDataTransactionAdd {
  type: TNullable<TTypeTransaction>
  name: string
  currency: TNullable<TMongoObjectId>
  amount: number
  check: TNullable<TMongoObjectId>
  category: TNullable<TMongoObjectId>
  time: TNullable<string>
  description?: string
}
export interface IArgumentsDataTransactionUpdate extends IArgumentsDataTransactionAdd {}
