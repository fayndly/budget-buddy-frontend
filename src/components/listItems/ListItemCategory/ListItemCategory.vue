<script setup lang="ts">
import '@material/web/list/list-item'

import type { IPropsListItemCategory } from './props.types'

defineProps<IPropsListItemCategory>()

const translateType = {
  expense: 'Расход',
  income: 'Доход'
}
</script>

<template>
  <md-list-item
    type="button"
    class="list-item-category"
    @click="$router.push({ name: 'Category', params: { categoryId: category.id } })"
  >
    <div slot="headline">{{ category.name }}</div>
    <div slot="supporting-text">
      {{ translateType[category.type] }}
    </div>
    <span class="material-icons-outlined list-item-category__icon-end" slot="end">
      chevron_right
    </span>
    <span
      class="material-icons-outlined list-item-category__icon-start"
      slot="start"
      :style="{ 'background-color': category.color }"
    >
      {{ category.icon }}
    </span>
  </md-list-item>
</template>

<style lang="scss" scoped>
.list-item-category {
  &__icon-end {
  }
  &__icon-start {
    color: white;
    padding: 8px;
    min-width: 40px;
    min-height: 40px;
    border-radius: 50%;
  }
}
</style>
