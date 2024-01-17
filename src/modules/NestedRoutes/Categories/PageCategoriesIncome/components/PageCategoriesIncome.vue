<script setup lang="ts">
import { onMounted } from 'vue'

import TemplateSection from '@/templates/TemplateSection.vue'
import LoaderMainSection from '@/components/loaders/LoaderMainSection/LoaderMainSection.vue'

import ListItemCategory from '@/components/listItems/ListItemCategory/ListItemCategory.vue'

import { categories, useGetCategories, isLoading } from '../services/useGetCategories'

onMounted(async () => {
  await useGetCategories()
})
</script>

<template>
  <LoaderMainSection v-if="isLoading && !categories.length" />
  <TemplateSection>
    <md-list class="list-categories">
      <ListItemCategory v-for="category in categories" :key="category.id" :category="category" />
    </md-list>
    <md-fab
      class="fab-add-categories"
      variant="secondary"
      @click="
        $router.push({
          name: 'CategoriesAdd',
          query: {
            type: 'income'
          }
        })
      "
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
