<script setup lang="ts">
import { ref, watch } from 'vue'

import RadioCategory from '@/components/radio/RadioCategory/RadioCategory.vue'
import ButtonShowMore from './custom/ButtonShowMore/ButtonShowMore.vue'
import ButtonAddCategory from './custom/ButtonAddCategory/ButtonAddCategory.vue'

import type { IPropsInputChoseCategory } from '../types/props'
import type { ICategory } from '@/utils/types/interfaces'

defineProps<IPropsInputChoseCategory>()
const emit = defineEmits(['update:checkedValue', 'clickButtonAddCategory'])

const chosedCategory = ref<ICategory>()

watch(chosedCategory, () => {
  emit('update:checkedValue', chosedCategory.value)
})

const isMoreCategoriesShow = ref<boolean>(false)

const toogleShowMore = () => {
  isMoreCategoriesShow.value = !isMoreCategoriesShow.value
}
const clickButtonAddCategoryHandler = () => {
  emit('clickButtonAddCategory')
}
// $router.push({ name: 'AddCategory', query: { type: 'income' } })
</script>

<template>
  <ul class="list-categories" :class="{ 'hide-elements': !isMoreCategoriesShow }">
    <li v-for="category in categories" :key="category.id">
      <RadioCategory
        :id="category.id"
        :value="category"
        name="category"
        :icon="category.icon"
        :color="category.color"
        :shortDesc="category.shortDesc"
        v-model:checkedValue="chosedCategory"
      />
    </li>
    <li>
      <ButtonShowMore @click="toogleShowMore" />
    </li>
    <li>
      <ButtonAddCategory @click="clickButtonAddCategoryHandler" />
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

.hide-elements {
  li {
    &:nth-child(n + 5):not(:nth-last-child(-n + 2)) {
      display: none;
    }
  }
}
</style>
