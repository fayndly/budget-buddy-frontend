<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <ul class="list-cards-transaction">
    <h2 class="list-cards-transaction__header title-large outline-text">{{ title }}</h2>
    <slot></slot>
  </ul>
</template>

<style lang="scss">
.list-cards-transaction {
  padding-inline-start: 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  &__header {
    font-size: 18px;
  }
  &__item {
  }
}
</style>
