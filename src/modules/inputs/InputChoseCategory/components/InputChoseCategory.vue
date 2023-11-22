<script setup lang="ts">
import { ref } from 'vue'

import RadioCategory from '@/components/radio/RadioCategory/RadioCategory.vue'

interface ICategory {
  id: string
  shortDesc: string
  icon?: string
  color: string
}

const categories = ref<ICategory[]>([
  {
    id: 'category1',
    shortDesc: 'Транспорт',
    icon: 'directions_car',
    color: '#FF4F4F'
  },
  {
    id: 'category2',
    shortDesc: 'Интернет',
    color: '#5D4FFF',
    icon: 'language'
  },
  {
    id: 'category4',
    shortDesc: 'Ресторан',
    color: '#4FB5FF'
  },
  {
    id: 'category5',
    shortDesc: 'Походы в туалет',
    color: '#FFC34F'
  }
])
const chosedCategory = ref<ICategory>()

const emit = defineEmits(['update:checkedValue'])

function updateValueHandler(): void {
  emit('update:checkedValue', chosedCategory.value)
}
</script>

<template>
  <ul class="list-categories">
    <li v-for="category in categories" :key="category.id">
      <RadioCategory
        :id="category.id"
        :value="category.shortDesc"
        v-model:checkedValue="chosedCategory"
        name="category"
        :checked="category.id === chosedCategory?.id"
        :icon="category.icon"
        :color="category.color"
        @input="updateValueHandler"
      />
    </li>
  </ul>
</template>

<style lang="scss">
.list-categories {
  padding: 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
