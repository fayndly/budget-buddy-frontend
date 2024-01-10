<script setup lang="ts">
import { ref } from 'vue'

import '@material/web/button/text-button'
import '@material/web/dialog/dialog'

import type { IPropsDialogSetColor } from './types/props.types'

const colorField = ref<string>()

defineProps<IPropsDialogSetColor>()

const emits = defineEmits(['submitColor', 'closeModal'])

const submitHandler = (): void => {
  emits('submitColor', colorField.value)
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
      <form slot="content" id="form-color" method="dialog">
        <input type="color" name="input-color" id="input-color" v-model="colorField" required />
      </form>
      <div slot="actions">
        <md-text-button form="form-color" type="button" @click="closeModal">Отмена</md-text-button>
        <md-text-button form="form-color" type="submit" @click="submitHandler"
          >Добавить</md-text-button
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
