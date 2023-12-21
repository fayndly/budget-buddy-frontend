<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import '@material/web/button/text-button'

interface ICategoryData {
  _id: string
  user: string
  name: string
  type: 'expense' | 'income'
  color: string
  icon: string
  createdAt: string
  updatedAt: string
  __v: number
}

type TFormatArrayItems = Array<{ titleName: string; value: any; valueLinkTo?: any }>

const getCategoryData = async (): Promise<ICategoryData> => {
  return {
    _id: '65393051366139b39ce5ecf1',
    user: '65393051366139b39ce5eced',
    name: 'Зарплата',
    type: 'income',
    color: '#1a1a1a',
    icon: 'icon-category-income',
    __v: 0,
    createdAt: '2023-10-25T15:12:17.712Z',
    updatedAt: '2023-10-25T15:12:17.712Z'
  }
}

const translateType = {
  expense: 'Расход',
  income: 'Доход',
  notFounded: 'Нет данных'
}

const categoryInfo = ref<TFormatArrayItems | null>(null)
const categoryData = ref<ICategoryData | null>(null)

const getFormatArrayItems = (categoryData: ICategoryData): TFormatArrayItems => {
  return [
    {
      titleName: 'Имя',
      value: categoryData?.name || 'Нет данных'
    },
    {
      titleName: 'Тип',
      value: translateType[categoryData?.type] || 'Нет данных'
    },
    {
      titleName: 'Цвет',
      value: categoryData?.color || 'Нет данных'
    },
    {
      titleName: 'Иконка',
      value: categoryData?.icon || 'Нет данных'
    },
    {
      titleName: 'Время создания',
      value: getReadableTime(categoryData?.createdAt) || 'Нет данных'
    }
  ]
}

const getReadableTime = (time: string | undefined): string => {
  if (!time) {
    return 'Нет данных'
  }
  return new Date(time).toLocaleDateString('ru-RU')
}

onMounted(async () => {
  categoryData.value = await getCategoryData()
  categoryInfo.value = getFormatArrayItems(categoryData.value)
})
</script>

<template>
  <BarTopApp
    title="Категория"
    :showButtonEdit="true"
    @clickButtonEdit="
      $router.push({ name: 'CategoriesUpdate', params: { categoryId: categoryData?._id } })
    "
  />
  <TemplateMain>
    <TemplateSection>
      <ul class="category-info">
        <li class="category-info__item" v-for="item in categoryInfo" :key="item.titleName">
          <h2 class="category-info__title title-medium on-surface-text">{{ item.titleName }}:</h2>
          <span
            v-if="item.valueLinkTo"
            class="title-medium primary-text"
            @click="$router.push(item.valueLinkTo)"
            >{{ item.value }}</span
          >
          <span v-else class="category-info__text title-medium on-background-text">{{
            item.value
          }}</span>
        </li>
      </ul>
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss">
.category-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  &__item {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 8px;
  }
  &__title {
  }
  &__text {
    text-align: end;
  }
}
</style>
