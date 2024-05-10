import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { ICategory, TMongoObjectId, TTypeTransaction } from '@/utils/types/data/data.types'
import type { IDataCategory } from '@/utils/API/types/data.types'

import { categoryApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

export const useCategoriesStore = defineStore('categoriesApi', () => {
  const categories = ref<ICategory[]>([])
  const isCategoriesLoading = ref<boolean>(false)

  const getCategoryById = async (id: TMongoObjectId) => {
    const check = categories.value.find((val) => val.id === id)

    if (!check) {
      try {
        const { data } = await categoryApi.getOne(id)

        await uploadCategories()

        return clearData<IDataCategory, ICategory>(data)
      } catch (error) {
        console.log(error)

        return
      }
    }

    return check
  }

  const uploadCategories = async () => {
    console.log('uploadCategories')

    isCategoriesLoading.value = true
    try {
      const { data } = await categoryApi.getAll()

      const formatChecks = clearData<IDataCategory[], ICategory[]>(data)

      categories.value = formatChecks
    } catch (err) {
      categories.value = []
      console.log(err)
    } finally {
      isCategoriesLoading.value = false
    }
  }

  const $reset = () => {
    categories.value = []
  }

  const getCategories = (type: TTypeTransaction) => {
    return categories.value.filter((val) => val.type === type)
  }

  return {
    categories,
    uploadCategories,
    getCategoryById,
    isCategoriesLoading,
    getCategories,
    $reset
  }
})
