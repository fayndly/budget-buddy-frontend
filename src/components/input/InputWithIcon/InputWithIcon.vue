<script setup lang="ts">
defineProps(['icon', 'inputId'])
</script>

<template>
  <span class="input-with-icon">
    <label
      :for="inputId"
      v-if="icon"
      class="input-with-icon__icon material-icons-outlined outline-variant-text"
      >{{ icon }}</label
    >
    <slot name="input"></slot>
  </span>
</template>

<style lang="scss">
.input-with-icon {
  display: flex;
  align-items: start;
  justify-content: end;

  width: 100%;
  gap: 16px;

  &__icon {
    font-size: 42px;
  }
  &__input {
    width: 100%;
    max-width: calc(100% - 42px - 16px);
  }

  md-outlined-text-field,
  md-outlined-select {
    width: 100%;
    max-width: calc(100% - 42px - 16px);
  }
}
</style>
