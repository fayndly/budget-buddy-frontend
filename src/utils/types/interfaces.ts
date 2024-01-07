export interface ICurrency {
  id: string
  name: string
  symbol: string
  designation: string
}

export interface IDate {
  date: Date
  text: string
  id: string
}

export interface ICategory {
  id: string
  name: string
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
