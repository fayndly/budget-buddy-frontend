<script setup lang="ts">
defineProps<{
  color: string
  name: string
  icon?: string
  count: number
  cyrrancy: string
}>()
</script>

<template>
  <div
    class="card-category"
    :class="{ 'card-category--with-icon': icon }"
    :style="`background-color: ${color};`"
  >
    <span v-if="icon" class="card-category__icon material-icons-outlined">{{ icon }}</span>
    <span class="card-category__name label-large">{{ name }}</span>
    <span class="card-category__count label-large"
      >{{ count.toLocaleString('ru-RU') }}{{ cyrrancy }}</span
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
