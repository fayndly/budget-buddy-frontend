<script setup lang="ts">
import BarSnackbar from '@/components/bars/BarSnackbar/BarSnackbar.vue'
import { storeToRefs } from 'pinia'

import { useAppErrorsStore } from '../stores/AppErrorsStore'
const appErrorsStore = useAppErrorsStore()
const { errors } = storeToRefs(appErrorsStore)
</script>

<template>
  <div class="app-errors-wrapper" :style="{ 'padding-bottom': errors.length && '8px' }">
    <TransitionGroup name="list-errors">
      <BarSnackbar
        v-for="error in errors"
        :key="error.id"
        class="app-errors-wrapper__error"
        :title="error.title"
        @click-button-close="appErrorsStore.deleteError(error.id)"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.list-errors {
  &-enter-active,
  &-leave-active {
    transition: all 300ms ease-in-out;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }

  &-enter-from {
    transform: translateY(20px);
  }

  &-leave-to {
    transform: translateY(-20px);
  }
}

.app-errors-wrapper {
  width: 100%;

  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 8px;

  position: fixed;
  bottom: calc(80px);
  z-index: 4;

  transition: height 300ms ease-in-out;

  &__error {
  }
}
</style>
