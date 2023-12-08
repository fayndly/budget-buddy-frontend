export interface ICurrency {
  name: string
  id: string
  symbol: string
}

export interface IDate {
  date: Date
  text: string
  id: string
}

export interface ICategory {
  id: string
  shortDesc: string
  icon?: string
  color: string
}

export interface ICheck {
  name: string
  id: string
}

export interface INamePageRu {
  expense: string
  income: string
}

export interface IDataTransactions {
  count: number
  color: string
  strokeDasharray?: number
  strokeDashoffset?: number
}
