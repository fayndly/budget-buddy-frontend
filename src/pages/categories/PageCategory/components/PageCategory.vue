<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import SectionLoader from '@/components/sections/SectionLoader/SectionLoader.vue'
import SectionNotFound from '@/components/sections/SectionNotFound/SectionNotFound.vue'

import ListDataInfo from '@/components/wrappers/ListDataInfo/ListDataInfo.vue'

import type { ICategory, TMongoObjectId, TFormatListDataInfo } from '@/utils/types/data/data.types'

import { translateType } from '@/utils/helpers'

import { useCategoriesStore } from '@/stores/API/categories'
const { getCategoryById } = useCategoriesStore()

const categoryInfo = ref<TFormatListDataInfo | null>(null)
const category = ref<ICategory | null | undefined>(null)

const isDataLoading = ref<boolean>(false)

const getFormatArrayItems = (categoryData: ICategory): TFormatListDataInfo => {
  return [
    {
      titleName: 'Имя',
      value: categoryData.name
    },
    {
      titleName: 'Тип',
      value: translateType[categoryData?.type]
    },
    {
      titleName: 'Цвет',
      value: categoryData.color
    },
    {
      titleName: 'Иконка',
      value: categoryData.icon
    },
    {
      titleName: 'Время создания',
      value: new Date(categoryData.createdAt).toLocaleString()
    },
    {
      titleName: 'Время обновления',
      value: new Date(categoryData.updatedAt).toLocaleString()
    }
  ]
}

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const isCategoryNotFound = ref<boolean>(false)

onMounted(async () => {
  isDataLoading.value = true

  if (route.params.categoryId) {
    category.value = await getCategoryById(route.params.categoryId as TMongoObjectId)
    if (category.value === undefined) isCategoryNotFound.value = true
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
