<script setup lang="ts">
import { ref, watch } from 'vue'

import type { IDate } from '@/utils/types/interfaces'

import { InputChoseDateController } from '../helpers/InputChoseDateController'

import RadioDate from '@/components/radio/RadioDate/RadioDate.vue'
import DialogSetDate from '@/components/dialogs/DialogSetDate/DialogSetDate.vue'
import ButtonAddCustomDate from './custom/ButtonAddCustomDate/ButtonAddCustomDate.vue'

defineOptions({
  inheritAttrs: false
})

const dates = ref<IDate[]>([])
const dateField = ref<IDate>()

const emit = defineEmits(['update:modelValue'])
watch(dateField, () => {
  emit('update:modelValue', dateField.value)
})

const inputChoseDateManager = new InputChoseDateController(dateField, dates)
inputChoseDateManager.generateDates()
inputChoseDateManager.setDefaultValue()

const ButtonAddCustomDateHandler = () => {
  modalSetDateIsOpen.value = true
}

const submitDateHandler = (date: Date) => {
  inputChoseDateManager.addValue({
    date: date,
    text: date.getFullYear().toString(),
    id: date.toString()
  })
}

const modalSetDateIsOpen = ref<boolean>(false)

const closeModalHandler = () => {
  modalSetDateIsOpen.value = false
}
</script>

<template>
  <ul class="list-dates">
    <li v-for="date in dates" :key="date.id">
      <RadioDate
        :id="date.id"
        :value="date"
        name="date"
        :date="date.date"
        :header="date.text"
        v-model:checked-value="dateField"
      />
    </li>
    <li>
      <ButtonAddCustomDate @click="ButtonAddCustomDateHandler" />
    </li>
  </ul>
  <DialogSetDate
    headline="Выберите дату"
    :isOpen="modalSetDateIsOpen"
    @submitDate="submitDateHandler"
    @closeModal="closeModalHandler"
  />
</template>

<style lang="scss" scoped>
.list-dates {
  align-items: center;
  padding: 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
