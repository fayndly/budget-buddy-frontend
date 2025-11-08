<script setup lang="ts">
import type { IPropsListDataInfo } from './props.types'
defineProps<IPropsListDataInfo>()
</script>

<template>
  <ul class="list-data-info">
    <li class="list-data-info__item" v-for="item in values" :key="item.titleName">
      <h2 class="list-data-info__title title-medium on-surface-text">{{ item.titleName }}:</h2>
      <span
        v-if="item.valueLinkTo"
        class="title-medium primary-text"
        @click="$router.push(item.valueLinkTo)"
        >{{ item.value }}</span
      >
      <span v-else class="list-data-info__text title-medium on-background-text">{{
        item.value || 'Нет данных'
      }}</span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list-data-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  &__item {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 8px;
  }
  &__title {
  }
  &__text {
    text-align: end;
  }
}
</style>
