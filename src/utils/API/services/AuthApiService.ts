import { ApiInstance } from '../axios'
import type { AxiosInstance } from 'axios'

import type { IDataToken, IDataId } from '../types/data.types'
import type { IArgumentsDataAuthLogin, IArgumentsDataAuthSignup } from '../types/arguments.types'

export class AuthApiService extends ApiInstance {
  constructor(instance: AxiosInstance) {
    super(instance)
  }

  login(data: IArgumentsDataAuthLogin) {
    return this.instance.post<IDataToken>('/auth/login', data)
  }

  signup(data: IArgumentsDataAuthSignup) {
    return this.instance.post<IDataToken>('/auth/signup', data)
  }

  checkMe() {
    return this.instance.get<IDataId>('/auth/me')
  }
}
