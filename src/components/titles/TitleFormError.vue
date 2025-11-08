<script setup lang="ts">
defineProps(['error'])
</script>

<template>
  <div class="title-form-error error-container">
    <span class="title-form-error__text title-medium on-error-container-text">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.title-form-error {
  border-radius: 20px;
  padding: 16px;

  &__text {
  }
}
</style>
