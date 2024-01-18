<script setup lang="ts">
import type { IPropsCardTransaction } from './types/props'

import '@material/web/ripple/ripple'

defineProps<IPropsCardTransaction>()
</script>

<template>
  <div
    class="card-transaction container"
    @click="$router.push({ name: 'Transaction', params: { transactionId: id } })"
  >
    <md-ripple></md-ripple>
    <div class="card-transaction__category-visual" :style="{ 'background-color': category?.color }">
      <span
        v-if="category?.icon"
        class="material-icons-outlined card-transaction__category-visual-icon"
        >{{ category.icon }}</span
      >
      <div v-else class="card-transaction__category-visual-icon-empty"></div>
    </div>
    <div class="card-transaction__info">
      <div class="card-transaction__info-title">
        <p class="card-transaction__info-short-description body-large">{{ name }}</p>
        <p class="card-transaction__info-count label-large">
          {{ amount.toLocaleString('ru-RU') }}{{ currency?.symbol }}
        </p>
      </div>
      <div class="card-transaction__info-subtitle">
        <p class="card-transaction__info-category body-medium surface-variant-text">
          {{ category?.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  border-radius: 20px;
}
.card-transaction {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;

  &__category-visual {
    padding: 16px 8px;
    border-radius: 20px;
  }
  &__category-visual-icon {
    display: block;
    color: white;
  }
  &__category-visual-icon-empty {
    width: 24px;
    height: 24px;
  }
  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-grow: 1;
  }
  &__info-title {
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding-right: 8px;
  }
  &__info-short-description {
    color: white;
  }
  &__info-count {
    color: white;
  }
  &__info-subtitle {
  }
  &__info-category {
  }
}
</style>
