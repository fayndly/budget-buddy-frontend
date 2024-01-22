<script setup lang="ts">
import type { ICategory, ICurrency } from '@/utils/types/data/data.types'

defineProps<{
  category: ICategory
  amount: number
  cyrrancy: ICurrency
}>()
</script>

<template>
  <div
    class="card-category"
    :class="{ 'card-category--with-icon': category.icon }"
    :style="{ 'background-color': category.color }"
  >
    <span v-if="category.icon" class="card-category__icon material-icons-outlined">{{
      category.icon
    }}</span>
    <span class="card-category__name label-large">{{ category.name }}</span>
    <span class="card-category__count label-large"
      >{{ amount.toLocaleString(cyrrancy.designation) }}{{ cyrrancy.symbol }}</span
    >
  </div>
</template>

<style lang="scss">
.card-category {
  padding: 10px 16px;
  display: inline-flex;
  align-items: center;
  border-radius: 100px;
  min-height: 44px;
  gap: 8px;
  &__icon {
    color: white;
  }
  &__name {
    color: white;
  }
  &__count {
    color: white;
  }
  &--with-icon {
    padding: 10px 24px 10px 16px;
  }
}
</style>
