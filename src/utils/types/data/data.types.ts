export type TMongoObjectId = string
export type TTypeTransaction = 'income' | 'expense'

export interface IMongoTimestamps {
  createdAt: string
  updatedAt: string
}

export interface IMongoFields {
  _id: TMongoObjectId
  __v: number
}

export interface ICurrency extends IMongoTimestamps {
  id: TMongoObjectId
  name: string
  symbol: string
  designation: string
}

export interface ICheck extends IMongoTimestamps {
  id: TMongoObjectId
  transactions: {
    expense: TMongoObjectId[]
    income: TMongoObjectId[]
  }
  user: TMongoObjectId
  name: string
  amount: number
  currency: null | TMongoObjectId
}

export interface ICategory extends IMongoTimestamps {
  id: TMongoObjectId
  user: TMongoObjectId
  name: string
  type: TTypeTransaction
  color: string
  icon: string
  isSpecial: boolean
}

export interface ITransaction extends IMongoTimestamps {
  id: TMongoObjectId
  user: TMongoObjectId
  type: TTypeTransaction
  shortDescription: string
  currency: TMongoObjectId
  amount: number
  check: TMongoObjectId
  category: TMongoObjectId
  time: string
  fullDescription: string
}

export interface IDate {
  date: Date
  text: string
  id: string
}

export interface IColor {
  value: string
  id: string
}

export interface IIcon {
  value: string | null
  iconName: string
  id: string
}
