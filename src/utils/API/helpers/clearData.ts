import type { ICurrency, ICheck, ICategory, ITransaction } from '@/utils/types/data/data.types'
import type {
  IDataCurrency,
  IDataCheck,
  IDataCategory,
  IDataTransaction
} from '@/utils/API/types/data.types'

type TObjOrArr<T> = T | T[]

type TReturnData =
  | TObjOrArr<ICurrency>
  | TObjOrArr<ICheck>
  | TObjOrArr<ICategory>
  | TObjOrArr<ITransaction>

type TData =
  | TObjOrArr<IDataCurrency>
  | TObjOrArr<IDataCheck>
  | TObjOrArr<IDataCategory>
  | TObjOrArr<IDataTransaction>

const formatId = (object: any): void => {
  object.id = object._id
  delete object._id
  if (object.__v) delete object.__v
}

export const clearData = <T extends TData, D extends TReturnData>(data: T): D => {
  if (Array.isArray(data)) {
    return data.map((val) => {
      const readyData = Object.assign({}, val) as any

      readyData && typeof readyData === 'object' && formatId(readyData)
      readyData.check && typeof readyData.check === 'object' && formatId(readyData.check)
      readyData.category && typeof readyData.category === 'object' && formatId(readyData.category)
      readyData.currency && typeof readyData.currency === 'object' && formatId(readyData.currency)

      return readyData
    }) as any
  }

  const readyData = Object.assign({}, data) as any

  readyData && typeof readyData === 'object' && formatId(readyData)
  readyData.check && typeof readyData.check === 'object' && formatId(readyData.check)
  readyData.category && typeof readyData.category === 'object' && formatId(readyData.category)
  readyData.currency && typeof readyData.currency === 'object' && formatId(readyData.currency)

  return readyData
}
