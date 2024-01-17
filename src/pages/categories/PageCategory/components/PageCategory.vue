<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import SectionLoader from '@/components/sections/SectionLoader/SectionLoader.vue'
import SectionNotFound from '@/components/sections/SectionNotFound/SectionNotFound.vue'

import ListDataInfo from '@/components/wrappers/ListDataInfo/ListDataInfo.vue'

import type { ICategory, TMongoObjectId, TFormatListDataInfo } from '@/utils/types/data/data.types'

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
    await useGetOneCategory(route.params.categoryId as TMongoObjectId)
  } else {
    isCategoryNotFound.value = true
  }

  if (category.value) categoryInfo.value = getFormatArrayItems(category.value)

  isDataLoading.value = false
})
</script>

<template>
  <BarTopApp
    title="Категория"
    :showButtonEdit="!isCategoryNotFound"
    @clickButtonEdit="
      router.push({ name: 'CategoriesUpdate', params: { categoryId: category?.id } })
    "
  />
  <TemplateMain>
    <SectionLoader v-if="isDataLoading" />
    <SectionNotFound
      header="Категория не найдена"
      text="Возможно, она была удалена и больше не доступна"
      v-if="isCategoryNotFound"
    />
    <TemplateSection>
      <ListDataInfo :values="categoryInfo" />
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss"></style>
