export type TMongoObjectId = string
export type TTypeTransaction = 'income' | 'expense'

import type { TPopulateDoc } from '@/utils/API/types/data.types'

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
    expense: TPopulateDoc<ITransaction>[]
    income: TPopulateDoc<ITransaction>[]
  }
  user: TMongoObjectId
  name: string
  amount: number
  currency: TPopulateDoc<ICurrency>
}

export interface ICategory extends IMongoTimestamps {
  id: TMongoObjectId
  user: TMongoObjectId
  name: string
  type: TTypeTransaction
  color: string
  icon: string | null
  isSpecial: boolean
}

export interface ITransaction extends IMongoTimestamps {
  id: TMongoObjectId
  user: TMongoObjectId
  type: TTypeTransaction
  name: string
  currency: TPopulateDoc<ICurrency>
  amount: number
  check: TPopulateDoc<ICheck>
  category: TPopulateDoc<ICategory>
  time: string
  description: string
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

export type TFormatListDataInfo = { titleName: string; value: any; valueLinkTo?: any }[]

export interface IFormatTransactionsList {
  date: string
  transactions: ITransaction[]
}

export interface IFormatTransactionsVisualInfo {
  id: string
  amount: number
  category: ICategory | null
  currency: ICurrency | null
}
