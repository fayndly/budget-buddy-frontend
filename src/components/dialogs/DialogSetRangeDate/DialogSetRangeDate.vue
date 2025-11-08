<script setup lang="ts">
import { ref } from 'vue'

import '@material/web/button/text-button'
import '@material/web/dialog/dialog'

export interface IPropsDialogSetDate {
  headline: string
  isOpen: boolean
}
const setDefaultDate = (): void => {
  const stringDefaultDate = `${defaultDate.getFullYear()}-${(defaultDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`

  monthField.value = stringDefaultDate
}

const defaultDate: Date = new Date()
const monthField = ref<string>()

setDefaultDate()

defineProps<IPropsDialogSetDate>()

const emits = defineEmits(['submitDate', 'closeModal'])

const submitHandler = (): void => {
  // const timeZone = new Date()
  // // console.log(timeZone)
  // console.log(new Date(`${monthField.value} 0:0`).toISOString())

  emits('submitDate', new Date(monthField.value || defaultDate))
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
      <form
        slot="content"
        id="form-date"
        method="dialog"
        class="from-range-date"
        @submit.prevent="submitHandler"
      >
        <input type="month" name="input-date" id="input-date" v-model="monthField" required />
      </form>
      <div slot="actions">
        <md-text-button form="form-date" type="button" @click="closeModal">Отмена</md-text-button>
        <md-text-button form="form-date" type="submit">Выбрать</md-text-button>
      </div>
    </md-dialog>
  </teleport>
</template>

<style lang="scss">
md-dialog {
  margin: auto;
}

.from-range-date {
  display: flex;
  flex-direction: column;
  gap: 8px;

  input {
    width: fit-content;
  }
}
</style>
