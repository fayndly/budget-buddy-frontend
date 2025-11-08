import type { Ref } from 'vue'
import type { TMongoObjectId } from '../types/data/data.types'

import type { ICurrency, ICheck, ICategory, ITransaction } from '@/utils/types/data/data.types'

type TReturnData = ICurrency | ICheck | ICategory | ITransaction

export const getById = <T extends TReturnData>(
  datasWrapper: Ref<T[]>,
  dataId: TMongoObjectId
): T | null => {
  for (let i = 0; i < datasWrapper.value.length; i++) {
    if (datasWrapper.value[i].id === dataId) return datasWrapper.value[i]
  }
  return null
}
