<script setup lang="ts">
defineProps(['header'])
</script>

<template>
  <div class="wrapper-list-inputs">
    <h3 class="wrapper-list-inputs__header outline-variant-text title-large">{{ header }}</h3>
    <slot name="content"></slot>
  </div>
</template>

<style lang="scss">
.wrapper-list-inputs {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: calc(100% - 42px - 16px);
  gap: 8px;
  &__header {
  }
}
</style>
