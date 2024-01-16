<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import LoaderMainSection from '@/components/loaders/LoaderMainSection/LoaderMainSection.vue'

import ListDataInfo from '@/components/wrappers/ListDataInfo/ListDataInfo.vue'

import type {
  ICategory,
  TTypeTransaction,
  TFormatListDataInfo
} from '@/utils/types/data/data.types'

import { useGetOneCategory, category, isCategoryNotFound } from '../services/useGetOneCategory'

import { translateType } from '@/utils/helpers'

const categoryInfo = ref<TFormatListDataInfo | null>(null)

const isDataLoading = ref<boolean>(false)

const getFormatArrayItems = (categoryData: ICategory): TFormatListDataInfo => {
  return [
    {
      titleName: 'Имя',
      value: categoryData?.name
    },
    {
      titleName: 'Тип',
      value: translateType[categoryData?.type]
    },
    {
      titleName: 'Цвет',
      value: categoryData?.color
    },
    {
      titleName: 'Иконка',
      value: categoryData?.icon
    },
    {
      titleName: 'Время создания',
      value: new Date(categoryData?.createdAt).toLocaleString('ru-RU')
    },
    {
      titleName: 'Время обновления',
      value: new Date(categoryData?.updatedAt).toLocaleString('ru-RU')
    }
  ]
}

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  isDataLoading.value = true

  if (route.params.categoryId) {
    await useGetOneCategory(route.params.categoryId as TTypeTransaction)
  } else {
    return router.replace({ name: 'NotFounded' })
  }
  if (isCategoryNotFound.value) {
    return router.replace({ name: 'NotFounded' })
  }

  if (category.value) categoryInfo.value = getFormatArrayItems(category.value)

  isDataLoading.value = false
})
</script>

<template>
  <BarTopApp
    title="Категория"
    :showButtonEdit="true"
    @clickButtonEdit="
      $router.push({ name: 'CategoriesUpdate', params: { categoryId: category?.id } })
    "
  />
  <TemplateMain>
    <LoaderMainSection v-if="isDataLoading" />
    <TemplateSection>
      <ListDataInfo :values="categoryInfo" />
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss"></style>
