import { ApiInstance } from '../axios'
import type { AxiosInstance } from 'axios'

import type { IDataCurrency } from '../types/data.types'
import type { TMongoObjectId } from '@/utils/types/data/data.types'

export class CurrencyApiService extends ApiInstance {
  constructor(instance: AxiosInstance) {
    super(instance)
  }

  getOne(id: TMongoObjectId) {
    return this.instance.get<IDataCurrency>(`/currencies/${id}`)
  }

  getAll() {
    return this.instance.get<IDataCurrency[]>('/currencies')
  }
}
