import instance from './axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

import type { IArgumentsPostAuthLogin, IArgumentsPostAuthSignup } from './types/arguments.types'
import type { IResponsePostAuthLogin, IResponsePostAuthSignup } from './types/responses.types'

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
}

export const apiManager = new Api(instance)
