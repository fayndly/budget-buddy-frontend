<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import type { ICategory } from '@/utils/types/data/data.types'

import TemplateSection from '@/templates/TemplateSection.vue'
import SectionLoader from '@/components/sections/SectionLoader/SectionLoader.vue'
import SectionEmpty from '@/components/sections/SectionEmpty/SectionEmpty.vue'

import ListItemCategory from '@/components/listItems/ListItemCategory/ListItemCategory.vue'

import { useCategoriesStore } from '@/stores/API/categories'
import { storeToRefs } from 'pinia'

const categoriesStore = useCategoriesStore()
const { categories, isCategoriesLoading } = storeToRefs(categoriesStore)

const typingCategories = ref<ICategory[]>([])

onMounted(() => {
  isCategoriesLoading.value = false
  typingCategories.value = categoriesStore.getCategories('income')
  isCategoriesLoading.value = true
})

watch(categories, () => {
  isCategoriesLoading.value = false
  typingCategories.value = categoriesStore.getCategories('income')
  isCategoriesLoading.value = true
})

const pathToCreateCategory = {
  name: 'CategoriesAdd',
  query: {
    type: 'income'
  }
}
</script>

<template>
  <SectionEmpty
    v-if="!isCategoriesLoading && !categories.length"
    header="Нет категорий"
    text="Создайте категорию кнопкой ниже"
    :routeTo="pathToCreateCategory"
  />
  <SectionLoader v-if="isCategoriesLoading && !typingCategories.length" />
  <TemplateSection>
    <md-list class="list-categories">
      <ListItemCategory
        v-for="category in typingCategories"
        :key="category.id"
        :category="category"
      />
    </md-list>
    <md-fab
      class="fab-add-categories"
      variant="secondary"
      @click="$router.push(pathToCreateCategory)"
      ><span slot="icon" class="material-icons-outlined">add</span></md-fab
    >
  </TemplateSection>
</template>

<style lang="scss" scoped>
.fab-add-categories {
  position: absolute;
  bottom: calc(16px + 80px);
  right: 16px;
}
</style>
