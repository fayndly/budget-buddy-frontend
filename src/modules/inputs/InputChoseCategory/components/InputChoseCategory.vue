<script setup lang="ts">
import { ref, watch, computed } from 'vue'

import RadioCategory from '@/components/radio/RadioCategory/RadioCategory.vue'
import ButtonShowMore from './custom/ButtonShowMore/ButtonShowMore.vue'
import ButtonAddCategory from './custom/ButtonAddCategory/ButtonAddCategory.vue'

import type { IPropsInputChoseCategory } from '../types/props.types'

const props = defineProps<IPropsInputChoseCategory>()
const emit = defineEmits(['update:modelValue', 'clickButtonAddCategory'])

const chosedCategory = ref<string | null>(null)

const updateValueHandler = (): void => {
  emit('update:modelValue', chosedCategory.value)
}

const getDefaultCategory = computed(() => props.defaultValue)

watch(chosedCategory, () => {
  if (chosedCategory.value) updateValueHandler()
})

watch(getDefaultCategory, () => {
  if (props.defaultValue) {
    chosedCategory.value = props.defaultValue
    updateValueHandler()
  }
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
        v-model:modelValue="chosedCategory"
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
