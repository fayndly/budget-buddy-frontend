import type { ICurrency, ICheck, ICategory, ITransaction } from '@/utils/types/data/data.types'
import type {
  IDataCurrency,
  IDataCheck,
  IDataCategory,
  IDataTransaction
} from '@/utils/types/data/serverData.types'

type TReturnData =
  | ICurrency
  | ICheck
  | ICategory
  | ITransaction
  | ICurrency[]
  | ICheck[]
  | ICategory[]
  | ITransaction[]

type TData =
  | IDataCurrency
  | IDataCheck
  | IDataCategory
  | IDataTransaction
  | IDataCurrency[]
  | IDataCheck[]
  | IDataCategory[]
  | IDataTransaction[]

export const clearData = <T extends TData, D extends TReturnData>(data: T): D => {
  if (Array.isArray(data)) {
    return data.map((val) => {
      const readyData = Object.assign({}, val) as any
      readyData.id = (val as any)._id
      delete readyData._id
      delete readyData.__v
      return readyData
    }) as any
  }
  const readyData = { ...data } as any
  readyData.id = (data as any)._id
  delete (readyData as any)._id
  delete (readyData as any).__v
  return readyData as any
}
