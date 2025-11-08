import type {
  TMongoObjectId,
  IMongoFields,
  ICheck,
  ICurrency,
  ICategory,
  ITransaction
} from './data.types'

export interface IDataId {
  id: TMongoObjectId
}

export interface IDataSuccess {
  success: boolean
}

export interface IDataToken {
  token: string
}

export interface IDataAuth extends IDataSuccess, IDataToken {}

export interface IDataCurrency extends IMongoFields, Omit<ICurrency, 'id'> {}
export interface IDataCheck extends IMongoFields, Omit<ICheck, 'id'> {}
export interface IDataCategory extends IMongoFields, Omit<ICategory, 'id'> {}
export interface IDataTransaction extends IMongoFields, Omit<ITransaction, 'id'> {}
