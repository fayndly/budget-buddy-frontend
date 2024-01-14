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
</template>
