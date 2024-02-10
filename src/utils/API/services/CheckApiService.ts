import { ApiInstance } from '../axios'
import type { AxiosInstance } from 'axios'

import type { IDataCheck, IDataId } from '../types/data.types'
import type { TMongoObjectId } from '@/utils/types/data/data.types'
import type { IArgumentsDataCheckAdd, IArgumentsDataCheckUpdate } from '../types/arguments.types'

export class CheckApiService extends ApiInstance {
  constructor(instance: AxiosInstance) {
    super(instance)
  }

  getOne(
    id: TMongoObjectId,
    populate?: {
      currency?: boolean
      transactions?: {
        expense?: boolean
        income?: boolean
      }
    }
  ) {
    return this.instance.get<IDataCheck>(`/checks/${id}`, { params: { populate } })
  }

  getAll(populate?: {
    currency?: boolean
    transactions?: {
      expense?: boolean
      income?: boolean
    }
  }) {
    return this.instance.get<IDataCheck[]>('/checks', {
      params: { populate }
    })
  }

  create(data: IArgumentsDataCheckAdd) {
    return this.instance.post<IDataCheck>('/checks', data)
  }

  update(id: TMongoObjectId, data: IArgumentsDataCheckUpdate) {
    return this.instance.patch<IDataCheck>(`/checks/${id}`, data)
  }

  delete(id: TMongoObjectId) {
    return this.instance.delete<IDataId>(`/checks/${id}`)
  }
}
