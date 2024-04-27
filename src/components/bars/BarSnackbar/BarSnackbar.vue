<script setup lang="ts">
import '@material/web/iconbutton/icon-button'

interface IPropsBarSnackbar {
  title: string | null
}

defineProps<IPropsBarSnackbar>()
defineEmits(['clickButtonClose'])
</script>

<template>
  <div class="snackbar inverse-surface">
    <span class="snackbar__title inverse-on-surface-text body-large">{{ title }}</span>
    <md-icon-button class="snackbar__button-close" @click="$emit('clickButtonClose')">
      <span class="material-icons-outlined inverse-on-surface-text">close</span>
    </md-icon-button>
  </div>
</template>

<style lang="scss" scoped>
.snackbar {
  width: 100%;
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
