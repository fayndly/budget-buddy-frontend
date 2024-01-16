<script setup lang="ts">
import { ref, watch, computed } from 'vue'

import RadioCategory from '@/components/radio/RadioCategory/RadioCategory.vue'
import ButtonShowMore from './custom/ButtonShowMore/ButtonShowMore.vue'
import ButtonAddCategory from './custom/ButtonAddCategory/ButtonAddCategory.vue'

import type { IPropsInputChoseCategory } from '../types/props.types'
import type { TMongoObjectId } from '@/utils/types/data/data.types'

const props = defineProps<IPropsInputChoseCategory>()
const emit = defineEmits(['update:modelValue', 'clickButtonAddCategory'])

const chosedCategory = ref<TMongoObjectId | null>(null)

const updateValueHandler = (): void => {
  emit('update:modelValue', chosedCategory.value)
}

const getDefaultCategory = computed(() => props.defaultValue)

const setDefaultCategory = () => {
  if (props.defaultValue) {
    chosedCategory.value = props.defaultValue
    updateValueHandler()
  }
}
setDefaultCategory()
watch(getDefaultCategory, () => {
  setDefaultCategory()
})

const isMoreCategoriesShow = ref<boolean>(false)

const toogleShowMore = () => {
  isMoreCategoriesShow.value = !isMoreCategoriesShow.value
}
const clickButtonAddCategoryHandler = () => {
  emit('clickButtonAddCategory')
}
</script>

<template>
  <ul class="list-categories" :class="{ 'hide-elements': !isMoreCategoriesShow }">
    <li v-for="category in values" :key="category.id">
      <RadioCategory
        name="category"
        :id="category.id"
        :value="category.id"
        :icon="category.icon"
        :color="category.color"
        :nameCategory="category.name"
        :checked="category.id === chosedCategory"
        v-model:modelValue="chosedCategory"
        @change="updateValueHandler"
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
