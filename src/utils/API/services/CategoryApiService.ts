import { ApiInstance } from '../axios'
import type { AxiosInstance } from 'axios'

import type { IDataId, IDataCategory } from '../types/data.types'
import type { TMongoObjectId, TTypeTransaction } from '@/utils/types/data/data.types'
import type {
  IArgumentsDataCategoryAdd,
  IArgumentsDataCategoryUpdate
} from '../types/arguments.types'

export class CategoryApiService extends ApiInstance {
  constructor(instance: AxiosInstance) {
    super(instance)
  }

  getOne(id: TMongoObjectId) {
    return this.instance.get<IDataCategory>(`/categories/${id}`)
  }

  getAll(filter?: { type: TTypeTransaction }) {
    return this.instance.get<IDataCategory[]>('/categories', { params: { filter } })
  }

  create(data: IArgumentsDataCategoryAdd) {
    return this.instance.post<IDataCategory>('/categories', data)
  }

  update(id: TMongoObjectId, data: IArgumentsDataCategoryUpdate) {
    return this.instance.patch<IDataCategory>(`/categories/${id}`, data)
  }

  delete(id: TMongoObjectId) {
    return this.instance.delete<IDataId>(`/categories/${id}`)
  }
}
