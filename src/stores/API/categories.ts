import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { ICategory, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IDataCategory } from '@/utils/types/data/serverData.types'

// import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

export const useCategoriesStore = defineStore('categoriesApi', () => {
  const categories = ref<ICategory[]>([])

  const getCategories = computed(() => categories.value)

  const getCategoryById = (id: TMongoObjectId) => {
    return categories.value.find((val) => val.id === id)
  }

  const uploadCategories = async () => {
    try {
      // const { data } = await apiManager.getCategories({})
      const data = []

      const formatCategories = clearData<IDataCategory[], ICategory[]>(data)

      categories.value = formatCategories
    } catch (err) {
      categories.value = []
      console.log(err)
    }
  }

  return { categories, uploadCategories, getCategoryById, getCategories }
})
