import instance from './axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

import type {
  IArgumentsPostAuthLogin,
  IArgumentsPostAuthSignup,
  IArgumentsPostCheckAdd,
  IArgumentsPatchCheckUpdate,
  IArgumentsGetCategories,
  IArgumentsPostCategoryAdd,
  IArgumentsPatchCategoryUpdate,
  IArgumentsGetTransactions,
  IArgumentsPostTransactionAdd,
  IArgumentsPatchTransactionUpdate
} from './types/arguments.types'

import type {
  IDataId,
  IDataAuth,
  IDataCurrency,
  IDataCheck,
  IDataCategory,
  IDataTransaction
} from '@/utils/types/data/serverData.types'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

class Api {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  async postAuthLogin(params: IArgumentsPostAuthLogin): Promise<AxiosResponse<IDataAuth, any>> {
    return await this.instance.post('/auth/login', params)
  }

  async postAuthSignup(params: IArgumentsPostAuthSignup): Promise<AxiosResponse<IDataAuth, any>> {
    return await this.instance.post('/auth/signup', params)
  }

  async getAuthCheck(): Promise<AxiosResponse<any, any>> {
    // пока не понятно что возвращает
    return await this.instance.get('/auth/check')
  }

  async getCurrencies(): Promise<AxiosResponse<IDataCurrency[], any>> {
    return await this.instance.get('/currencies')
  }

  async getCheck(id: TMongoObjectId): Promise<AxiosResponse<IDataCheck, any>> {
    return await this.instance.get('/checks', { params: { id } })
  }

  async getChecks(): Promise<AxiosResponse<IDataCheck[], any>> {
    return await this.instance.get('/checks')
  }

  async postCheckAdd(params: IArgumentsPostCheckAdd): Promise<AxiosResponse<IDataCheck, any>> {
    return await this.instance.post('/checks', params)
  }

  async patchCheckUpdate(
    params: IArgumentsPatchCheckUpdate,
    id: TMongoObjectId
  ): Promise<AxiosResponse<IDataCheck, any>> {
    return await this.instance.patch('/checks', params, { params: { id } })
  }

  async deleteCheckDelete(id: TMongoObjectId): Promise<AxiosResponse<IDataId, any>> {
    return await this.instance.delete('/checks', { params: { id } })
  }

  async getCategory(id: TMongoObjectId): Promise<AxiosResponse<IDataCategory, any>> {
    return await this.instance.get('/categories', { params: { id } })
  }

  async getCategories(
    params: IArgumentsGetCategories
  ): Promise<AxiosResponse<IDataCategory[], any>> {
    return await this.instance.get('/categories', { params })
  }

  async postCategoryAdd(
    params: IArgumentsPostCategoryAdd
  ): Promise<AxiosResponse<IDataCategory, any>> {
    return await this.instance.post('/categories', params)
  }

  async patchCategoryUpdate(
    params: IArgumentsPatchCategoryUpdate,
    id: TMongoObjectId
  ): Promise<AxiosResponse<IDataCategory, any>> {
    return await this.instance.patch('/categories', params, { params: { id } })
  }

  async deleteCategoryDelete(id: TMongoObjectId): Promise<AxiosResponse<IDataId, any>> {
    return await this.instance.delete('/categories', { params: { id } })
  }

  async getTransaction(id: TMongoObjectId): Promise<AxiosResponse<IDataTransaction, any>> {
    return await this.instance.get('/transactions', { params: { id } })
  }

  async getTransactions(
    params: IArgumentsGetTransactions
  ): Promise<AxiosResponse<IDataTransaction[], any>> {
    return await this.instance.get('/transactions', { params })
  }

  async postTransactionAdd(
    params: IArgumentsPostTransactionAdd
  ): Promise<AxiosResponse<IDataTransaction, any>> {
    return await this.instance.post('/transactions', params)
  }

  async patchTransactionUpdate(
    params: IArgumentsPatchTransactionUpdate,
    id: TMongoObjectId
  ): Promise<AxiosResponse<IDataTransaction, any>> {
    return await this.instance.patch('/transactions', params, { params: { id } })
  }

  async deleteTransactionDelete(id: TMongoObjectId): Promise<AxiosResponse<IDataId, any>> {
    return await this.instance.delete('/transactions', { params: { id } })
  }
}

export const apiManager = new Api(instance)
