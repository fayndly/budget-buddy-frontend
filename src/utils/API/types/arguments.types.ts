import type { TMongoObjectId, TTypeTransaction } from '@/utils/types/data/data.types'

interface IArgumentsAuth {
  email: string
  password: string
}

export interface IArgumentsPostAuthLogin extends IArgumentsAuth {}

export interface IArgumentsPostAuthSignup extends IArgumentsAuth {
  userName: string
}

export interface IArgumentsGetCategories {
  type?: TTypeTransaction
}
export interface IArgumentsPostCheckAdd {
  name: string
  amount: number
  currency: string | null
}
export interface IArgumentsPatchCheckUpdate extends IArgumentsPostCheckAdd {}

export interface IArgumentsGetCategory {
  id: TMongoObjectId
  type: TTypeTransaction
}

export interface IArgumentsPostCategoryAdd {
  name: string
  type: TTypeTransaction
  color: string
  icon?: string | null
}
export interface IArgumentsPatchCategoryUpdate extends IArgumentsPostCategoryAdd {}

export interface IArgumentsGetTransactions {
  check?: TMongoObjectId
  type?: TTypeTransaction
  startTime?: string
  endTime?: string
}
export interface IArgumentsPostTransactionAdd {
  type: TTypeTransaction
  name: string
  currency: TMongoObjectId
  amount: number
  check: TMongoObjectId
  category: TMongoObjectId
  time: string
  description?: string | null
}
export interface IArgumentsPatchTransactionUpdate extends IArgumentsPostTransactionAdd {}
