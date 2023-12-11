<script setup lang="ts">
import { ref, type Ref } from 'vue'

import '@material/web/button/text-button'
import '@material/web/dialog/dialog'

export interface IPropsDialogSetDate {
  headline: string
  isOpen: boolean
}
const setDefaultDate = (dateNowWrapper: Ref<undefined | string>, dateDefault: Date): void => {
  const stringDefaultDate = `${defaultDate.getFullYear()}-${defaultDate.getMonth() + 1}`

  dateNowWrapper.value = stringDefaultDate
}

const defaultDate: Date = new Date(Date.now())
const monthField = ref<string>()
setDefaultDate(monthField, defaultDate)

defineProps<IPropsDialogSetDate>()

const emits = defineEmits(['submitDate', 'closeModal'])

const submitHandler = (): void => {
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
