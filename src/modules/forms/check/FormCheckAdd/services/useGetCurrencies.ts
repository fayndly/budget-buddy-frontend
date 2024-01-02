import { apiManager } from '@/utils/API/index'

export const useGetCurrencies = async () => {
  return await apiManager.getCurrencies().then((response) => {
    return response.data
  })
}
