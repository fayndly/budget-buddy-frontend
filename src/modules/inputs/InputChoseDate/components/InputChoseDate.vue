<script setup lang="ts">
import { ref, watch } from 'vue'

import type { IDate } from '@/utils/types/data/data.types'
import type { IPropsInputChoseDate } from '../types/props.types'

import { DateController } from '../helpers/dateController'

import InputRadioDate from '@/components/inputs/radio/InputRadioDate/InputRadioDate.vue'
import DialogSetDate from '@/components/dialogs/DialogSetDate/DialogSetDate.vue'
import ButtonAddCustomDate from './custom/ButtonAddCustomDate/ButtonAddCustomDate.vue'

const dates = ref<IDate[]>([])
const dateField = ref<IDate | null>(null)

const props = defineProps<IPropsInputChoseDate>()
const emit = defineEmits(['update:modelValue'])
watch(dateField, () => {
  emit('update:modelValue', dateField.value?.date)
})

const dateManager = new DateController(dateField, dates)
dateManager.generateDates()
dateManager.setDefaultValue()

const ButtonAddCustomDateHandler = () => {
  modalSetDateIsOpen.value = true
}

const submitDateHandler = (date: Date) => {
  dateManager.addValue({
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
      <InputRadioDate
        name="date"
        :id="date.id"
        :value="date.date.toLocaleDateString('ru-RU')"
        :date="date.date"
        :header="date.text"
        :checked="date.id === dateField?.id"
        v-model:modelValue="dateField"
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
