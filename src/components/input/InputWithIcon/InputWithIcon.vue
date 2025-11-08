<script setup lang="ts">
defineProps(['icon'])
</script>

<template>
  <label class="input-with-icon">
    <span v-if="icon" class="input-with-icon__icon material-icons-outlined outline-variant-text">{{
      icon
    }}</span>
    <slot name="input"></slot>
  </label>
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
