import { instance } from './axios'

import { AuthApiService } from './services/AuthApiService'
import { CurrencyApiService } from './services/CurrencyApiService'
import { CheckApiService } from './services/CheckApiService'
import { CategoryApiService } from './services/CategoryApiService'
import { TransactionApiService } from './services/TransactionApiService'

export const authApi = new AuthApiService(instance)
export const currencyApi = new CurrencyApiService(instance)
export const checkApi = new CheckApiService(instance)
export const categoryApi = new CategoryApiService(instance)
export const transactionApi = new TransactionApiService(instance)
