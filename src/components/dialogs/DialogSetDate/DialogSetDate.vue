<script setup lang="ts">
import { ref, type Ref } from 'vue'

import '@material/web/button/text-button'
import '@material/web/dialog/dialog'

export interface IPropsDialogSetDate {
  headline: string
  isOpen: boolean
}
const setDefaultDate = (dateNowWrapper: Ref<undefined | string>, dateDefault: Date): void => {
  const stringDefaultDate = `${defaultDate.getFullYear().toString().padStart(4, '0')}-${(
    dateDefault.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${dateDefault.getDate().toString().padStart(2, '0')}`

  dateNowWrapper.value = stringDefaultDate
}

const defaultDate: Date = new Date(Date.now())
const dateField = ref<string>()
setDefaultDate(dateField, defaultDate)

defineProps<IPropsDialogSetDate>()

const emits = defineEmits(['submitDate', 'closeModal'])
const submitHandler = (): void => {
  emits('submitDate', new Date(dateField.value + ' 00:00:00' || defaultDate))
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
      <form slot="content" id="form-date" method="dialog">
        <input type="date" name="input-date" id="input-date" v-model="dateField" required />
      </form>
      <div slot="actions">
        <md-text-button form="form-date" type="button" @click="closeModal">Отмена</md-text-button>
        <md-text-button form="form-date" type="submit" @click="submitHandler"
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
