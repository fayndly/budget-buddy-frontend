import type { TMongoObjectId, TTypeTransaction } from '@/utils/types/data/data.types'

export interface IMongoTimestamps {
  createdAt: string
  updatedAt: string
}

export interface IMongoFields {
  _id: TMongoObjectId
  __v: number
}

export interface IDataId {
  id: TMongoObjectId
}

export interface IDataToken {
  token: TMongoObjectId
}

export type TPopulateDoc<T> = TMongoObjectId | (T | null)

export interface IDataCurrency extends IMongoTimestamps, IMongoFields {
  name: string
  symbol: string
  designation: string
}

export interface IDataCheck extends IMongoTimestamps, IMongoFields {
  transactions: {
    expense: TPopulateDoc<IDataTransaction>[]
    income: TPopulateDoc<IDataTransaction>[]
  }
  user: TMongoObjectId
  name: string
  amount: number
  currency: TPopulateDoc<IDataCurrency>
}

export interface IDataCategory extends IMongoTimestamps, IMongoFields {
  user: TMongoObjectId
  name: string
  type: TTypeTransaction
  color: string
  icon: string | null
  isSpecial: boolean
}

export interface IDataTransaction extends IMongoTimestamps, IMongoFields {
  user: TMongoObjectId
  type: TTypeTransaction
  name: string
  currency: TPopulateDoc<IDataCurrency>
  amount: number
  check: TPopulateDoc<IDataCheck>
  category: TPopulateDoc<IDataCategory>
  time: string
  description: string
}
