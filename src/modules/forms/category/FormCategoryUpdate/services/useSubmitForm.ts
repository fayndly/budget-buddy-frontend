import { categoryApi } from '@/utils/API/index'
import { ref, reactive } from 'vue'

import type { TTypeTransaction, TMongoObjectId } from '@/utils/types/data/data.types'

import { getFormatValidateErrorsServer } from '@/utils/validations/validationFormat'

import { isAxiosError } from 'axios'
import type { IErrorData } from '@/utils/API/types/error.types'

import { useCategoriesStore } from '@/stores/API/categories'
import { useChecksStore } from '@/stores/API/checks'
import { useMainExpenseStore } from '@/modules/NestedRoutes/Main/PageMainExpense'
import { useMainIncomeStore } from '@/modules/NestedRoutes/Main/PageMainIncome'

export const isLoading = ref<boolean>(false)

export const postErrorText = ref<null | string>(null)
export const serverValidateErrors = reactive({})

export const usePatchCategoryUpdate = async (
  id: TMongoObjectId,
  dataFields: {
    name: string
    type: TTypeTransaction | null
    color: string | null
    icon: string | null
  },
  oldType: TTypeTransaction | undefined
): Promise<void> => {
  const { uploadCategories } = useCategoriesStore()
  const { uploadChecks } = useChecksStore()
  const mainExpenseStore = useMainExpenseStore()
  const mainIncomeStore = useMainIncomeStore()

  isLoading.value = true
  postErrorText.value = null

  if (dataFields.icon === null) dataFields.icon = 'null'

  try {
    const { data } = await categoryApi.update(id, dataFields)
    postErrorText.value = null
    console.log('Ответ от сервера: ', data)

    await uploadCategories()
    if (oldType && dataFields.type !== oldType) await uploadChecks()
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
