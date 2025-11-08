<script setup lang="ts">
import { reactive } from 'vue'
import type { IPropsCardCategory } from './types/props.types'

const props = defineProps<IPropsCardCategory>()

import { getReadableAmount } from '@/utils/helpers/getReadableAmount'

const stylesCard = reactive({
  'background-color': props.category?.color,
  border: props.category?.color ? 'none' : 'solid 2px var(--md-sys-color-outline)'
})

const classesCard = reactive({
  'card-category--with-icon': props.category?.icon
})
</script>

<template>
  <div class="card-category" :class="classesCard" :style="stylesCard">
    <span v-if="category?.icon" class="card-category__icon material-icons-outlined">{{
      category.icon
    }}</span>
    <span class="card-category__name label-large">{{ category?.name || 'Not found' }}</span>
    <span class="card-category__count label-large">{{ getReadableAmount(amount, currency) }}</span>
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
