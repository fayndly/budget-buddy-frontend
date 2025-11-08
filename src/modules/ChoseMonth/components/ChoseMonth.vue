<script setup lang="ts">
import { computed, ref } from 'vue'

import DialogSetRangeDate from '@/components/dialogs/DialogSetRangeDate/DialogSetRangeDate.vue'

import type { IPropsChoseMonth } from '../types/props.types'

defineProps<IPropsChoseMonth>()

import { storeToRefs } from 'pinia'

import { useMonthStore } from '../stores/MonthStore'
const monthStore = useMonthStore()
const { chosedMonth } = storeToRefs(monthStore)

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
]

const getStringChosedMonth = computed((): string => {
  if (!chosedMonth.value) return ''
  return months[new Date(chosedMonth.value).getMonth()]
})
const ButtonAddCustomDateHandler = () => {
  modalSetDateIsOpen.value = true
}

const modalSetDateIsOpen = ref<boolean>(false)

const closeModalHandler = () => {
  modalSetDateIsOpen.value = false
}

const submitDateHandler = (date: Date) => {
  monthStore.setMonth(date)
}

const titles = {
  expense: 'Расходы за',
  income: 'Доходы за'
}
</script>

<template>
  <div class="chose-month">
    <p class="chose-month__title title-medium on-surface-text">{{ titles[typeTitle] }}</p>
    <md-text-button class="chose-month__month" @click="ButtonAddCustomDateHandler">{{
      getStringChosedMonth
    }}</md-text-button>
  </div>
  <DialogSetRangeDate
    headline="Выберите месяц"
    :isOpen="modalSetDateIsOpen"
    @submitDate="submitDateHandler"
    @closeModal="closeModalHandler"
  />
</template>

<style lang="scss" scoped>
.chose-month {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
