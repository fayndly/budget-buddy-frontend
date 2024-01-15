<script setup lang="ts">
import type { IPropsDialogConfirmDeletion } from './types/props.types'

defineProps<IPropsDialogConfirmDeletion>()

const emits = defineEmits(['confirmDelete', 'closeModal'])

const submitHandler = (): void => {
  emits('confirmDelete')
  closeModal()
}

const closeModal = () => {
  emits('closeModal')
}
</script>

<template>
  <teleport to="body">
    <md-dialog type="alert" :open="isOpen" @cancel="closeModal">
      <div slot="headline">{{ headline }}</div>
      <div slot="content">{{ text }}</div>
      <div slot="actions">
        <md-text-button form="form-color" type="button" @click="closeModal">Отмена</md-text-button>
        <md-text-button form="form-color" type="submit" @click="submitHandler"
          >Удалить</md-text-button
        >
      </div>
    </md-dialog>
  </teleport>
</template>

<style lang="scss">
md-dialog {
  margin: auto;
}
</style>
