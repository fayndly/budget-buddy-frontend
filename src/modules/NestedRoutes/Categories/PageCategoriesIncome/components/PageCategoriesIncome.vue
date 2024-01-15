<script setup lang="ts">
import { onMounted } from 'vue'

import ListItemCategory from '@/components/listItems/ListItemCategory/ListItemCategory.vue'

import { categories, useGetCategories } from '../services/useGetCategories'

onMounted(async () => {
  await useGetCategories()
})
</script>

<template>
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
</template>

<style lang="scss" scoped>
.fab-add-categories {
  position: absolute;
  bottom: calc(16px + 80px);
  right: 16px;
}
</style>
