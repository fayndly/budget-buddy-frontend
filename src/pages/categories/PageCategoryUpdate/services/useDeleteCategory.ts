import { ref } from 'vue'
import { categoryApi } from '@/utils/API'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

import { isAxiosError } from 'axios'
import type { IErrorData } from '@/utils/API/types/error.types'

import { useCategoriesStore } from '@/stores/API/categories'

export const isCategoryDeleted = ref<boolean>(false)
export const postErrorText = ref<null | string>(null)

export const isDeleting = ref<boolean>(false)

export const useDeleteCategory = async (id: TMongoObjectId) => {
  isDeleting.value = true
  postErrorText.value = null

  const categoriesStore = useCategoriesStore()

  try {
    const { data } = await categoryApi.delete(id)

    postErrorText.value = null
    isCategoryDeleted.value = true

    await categoriesStore.uploadCategories()

    console.log(data)
  } catch (error) {
    if (isAxiosError<IErrorData>(error) && error.response) {
      const response = error.response
      console.log(response)

      postErrorText.value = response.data.message
    } else {
      console.log(error)
    }
    isCategoryDeleted.value = false
  } finally {
    isDeleting.value = false
  }
}
