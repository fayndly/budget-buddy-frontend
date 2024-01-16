<script setup lang="ts">
import { ref, watch, computed } from 'vue'

import type { IDate } from '@/utils/types/data/data.types'
import type { IPropsInputChoseDate } from '../types/props.types'

import { DateController } from '../helpers/dateController'

import InputRadioDate from '@/components/inputs/radio/InputRadioDate/InputRadioDate.vue'
import DialogSetDate from '@/components/dialogs/DialogSetDate/DialogSetDate.vue'
import ButtonAddCustomDate from './custom/ButtonAddCustomDate/ButtonAddCustomDate.vue'

const props = defineProps<IPropsInputChoseDate>()
const emit = defineEmits(['update:modelValue'])

const dates = ref<IDate[]>([])
const dateField = ref<IDate | null>(null)

const updateValueHandler = (): void => {
  emit('update:modelValue', dateField.value?.date)
}

const dateManager = new DateController(dateField, dates)

const getDefaultDate = computed(() => props.defaultValue)

const setDefaultDate = () => {
  if (props.defaultValue) {
    dateManager.clearWrapperDates()
    dateManager.addDate(new Date(props.defaultValue), null)
    dateManager.generateDates()
    dateManager.setDefaultDate()

    updateValueHandler()
  }
}

setDefaultDate()
watch(getDefaultDate, () => {
  setDefaultDate()
})

dateManager.generateDates()
dateManager.setDefaultDate()
updateValueHandler()

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
        :value="date.date.toLocaleDateString()"
        :date="date.date"
        :header="date.text"
        v-model:modelValue="dateField"
        :checked="date.id === dateField?.id"
        @change="updateValueHandler"
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
