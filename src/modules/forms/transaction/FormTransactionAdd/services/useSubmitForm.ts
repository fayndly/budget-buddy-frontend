import { transactionApi } from '@/utils/API/index'
import { ref, reactive } from 'vue'

import type { TMongoObjectId, TTypeTransaction } from '@/utils/types/data/data.types'

import { isAxiosError } from 'axios'
import type { IErrorData } from '@/utils/API/types/error.types'

import { getFormatValidateErrorsServer } from '@/utils/validations/validationFormat'

export const isLoading = ref<boolean>(false)

export const postErrorText = ref<null | string>(null)
export const serverValidateErrors = reactive({})

import { useChecksStore } from '@/stores/API/checks'
import { useMainExpenseStore } from '@/modules/NestedRoutes/Main/PageMainExpense'
import { useMainIncomeStore } from '@/modules/NestedRoutes/Main/PageMainIncome'

export const usePostTransactionAdd = async (dataFields: {
  name: string
  type: TTypeTransaction | null
  currency: TMongoObjectId | null
  amount: number
  check: TMongoObjectId | null
  category: TMongoObjectId | null
  time: string | null
  description?: string
}): Promise<void> => {
  const checksStore = useChecksStore()
  const mainExpenseStore = useMainExpenseStore()
  const mainIncomeStore = useMainIncomeStore()

  isLoading.value = true
  postErrorText.value = null

  try {
    const { data } = await transactionApi.create(dataFields)
    console.log('Ответ от сервера: ', data)

    postErrorText.value = null

    await checksStore.uploadChecks()
    await mainExpenseStore.uploadTransactions()
    await mainIncomeStore.uploadTransactions()
  } catch (error) {
    if (isAxiosError<IErrorData>(error) && error.response) {
      const response = error.response
      postErrorText.value = response.data.message

      if (response.status === 400 && Array.isArray(response.data)) {
        postErrorText.value = null
        Object.assign(serverValidateErrors, getFormatValidateErrorsServer(response.data))
      }

      console.log(response)
    } else {
      console.log(error)
    }
  } finally {
    isLoading.value = false
  }
}
