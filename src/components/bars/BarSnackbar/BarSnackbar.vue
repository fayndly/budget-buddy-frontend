<script setup lang="ts">
interface IPropsBarSnackbar {
  isOpen: boolean
  title: string | null
}

defineProps<IPropsBarSnackbar>()
defineEmits(['clickButtonClose'])
</script>

<template>
  <div class="snackbar inverse-surface" v-if="isOpen">
    <span class="snackbar__title inverse-on-surface-text body-large">{{ title }}</span>
    <md-icon-button class="snackbar__button-close" @click="$emit('clickButtonClose')">
      <span class="material-icons-outlined inverse-on-surface-text">close</span>
    </md-icon-button>
  </div>
</template>

<style lang="scss" scoped>
.snackbar {
  z-index: 4;
  width: calc(100% - 32px);
  left: 16px;
  bottom: calc(80px + 8px);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px 6px 16px;
  border-radius: 6px;
  &__title {
    text-wrap: wrap;
  }
}
</style>
