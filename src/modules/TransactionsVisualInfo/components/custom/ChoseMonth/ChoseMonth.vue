<script setup lang="ts">
import { computed, ref } from 'vue'
import { months, getRangeDateFromMonth } from '../../../helpers/index'
import DialogSetRangeDate from '@/components/dialogs/DialogSetRangeDate/DialogSetRangeDate.vue'

import type { IPropsChoseMonth } from './types/props.types'
import type { TTypeTransaction } from '@/utils/types/data/data.types'

const props = defineProps<IPropsChoseMonth>()

const getStringChosedMonth = computed((): string => months[new Date(chosedMonth.value).getMonth()])
const ButtonAddCustomDateHandler = () => {
  modalSetDateIsOpen.value = true
}

const modalSetDateIsOpen = ref<boolean>(false)

const closeModalHandler = () => {
  modalSetDateIsOpen.value = false
}

const chosedMonth = ref<string>(new Date(Date.now()).toISOString())

const submitDateHandler = (date: Date) => {
  chosedMonth.value = date.toISOString()
}

const getTitle = {
  expense: 'Расходы за',
  income: 'Доходы за'
}
</script>

<template>
  <div class="chose-month">
    <p class="chose-month__title title-medium on-surface-text">{{ getTitle[typeTitle] }}</p>
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
  &__title {
  }
  &__month {
  }
}
</style>
