import instance from './axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

import type {
  IArgumentsPostAuthLogin,
  IArgumentsPostAuthSignup,
  IArgumentsGetCheck,
  IArgumentsPostChecksAdd,
  IArgumentsPatchChecksUpdate
} from './types/arguments.types'
import type {
  IResponsePostAuthLogin,
  IResponsePostAuthSignup,
  IResponseGetCheck,
  IResponseGetChecks,
  IResponsePostCheckAdd,
  IResponsePatchCheckUpdate
} from './types/responses.types'

class Api {
  private instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  async postAuthLogin(
    params: IArgumentsPostAuthLogin
  ): Promise<AxiosResponse<IResponsePostAuthLogin, any>> {
    return await this.instance.post('/auth/login', params)
  }

  async postAuthSignup(
    params: IArgumentsPostAuthSignup
  ): Promise<AxiosResponse<IResponsePostAuthSignup, any>> {
    return await this.instance.post('/auth/signup', params)
  }

  async getAuthCheck(): Promise<AxiosResponse<any, any>> {
    return await this.instance.get('/auth/check')
  }

  async getCheck(params: IArgumentsGetCheck): Promise<AxiosResponse<IResponseGetCheck, any>> {
    return await this.instance.get('/checks', { params })
  }

  async getChecks(): Promise<AxiosResponse<IResponseGetChecks, any>> {
    return await this.instance.get('/checks')
  }

  async postCheckAdd(
    params: IArgumentsPostChecksAdd
  ): Promise<AxiosResponse<IResponsePostCheckAdd, any>> {
    return await this.instance.post('/checks', params)
  }

  async patchCheckUpdate(
    params: IArgumentsPatchChecksUpdate
  ): Promise<AxiosResponse<IResponsePatchCheckUpdate, any>> {
    return await this.instance.patch('/checks', params)
  }
}

export const apiManager = new Api(instance)
