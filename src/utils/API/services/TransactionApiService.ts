import { ApiInstance } from '../axios'
import type { AxiosInstance } from 'axios'

import type { IDataId, IDataTransaction } from '../types/data.types'
import type { TMongoObjectId, TTypeTransaction } from '@/utils/types/data/data.types'
import type {
  IArgumentsDataTransactionAdd,
  IArgumentsDataTransactionUpdate
} from '../types/arguments.types'

export class TransactionApiService extends ApiInstance {
  constructor(instance: AxiosInstance) {
    super(instance)
  }

  getOne(
    id: TMongoObjectId,
    populate?: {
      currency?: boolean
      check?: boolean
      category?: boolean
    }
  ) {
    return this.instance.get<IDataTransaction>(`/transactions/${id}`, { params: { populate } })
  }

  getAll(
    filter?: {
      check?: TMongoObjectId
      type?: TTypeTransaction
    },
    sort?: {
      startTime: string
      endTime: string
    },
    populate?: {
      currency?: boolean
      check?: boolean
      category?: boolean
    }
  ) {
    return this.instance.get<IDataTransaction[]>('/transactions', {
      params: { sort, filter, populate }
    })
  }

  create(data: IArgumentsDataTransactionAdd) {
    return this.instance.post<IDataTransaction>('/transactions', data)
  }

  update(id: TMongoObjectId, data: IArgumentsDataTransactionUpdate) {
    return this.instance.patch<IDataTransaction>(`/transactions/${id}`, data)
  }

  delete(id: TMongoObjectId) {
    return this.instance.delete<IDataId>(`/transactions/${id}`)
  }
}
