<script setup lang="ts">
import { ref } from 'vue'

import type { IColor } from '@/modules/inputs/InputChoseColor'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'
import InputList from '@/components/input/InputList/InputList.vue'

import { InputChoseColor } from '@/modules/inputs/InputChoseColor'
import InputCount from '@/components/input/InputCount/InputCount.vue'
import InputCurrency from '@/components/input/InputCurrency/InputCurrency.vue'
import InputName from './custom/InputName/InputName.vue'

import SubmitFormButtons from '@/components/submit/SubmitFormButtons/SubmitFormButtons.vue'

import type { ICurrency } from '@/utils/types/interfaces'

const currencies: ICurrency[] = [
  {
    name: 'RUB',
    id: '123',
    symbol: '₽'
  },
  {
    name: 'EUR',
    id: '234',
    symbol: '€'
  },
  {
    name: 'USD',
    id: '345',
    symbol: '$'
  }
]

const nameField = ref<string>('')
const currencyField = ref<ICurrency>()
const countField = ref<number>(0)
const colorField = ref<IColor>()

const submitForm = async () => {
  const dataFormToString = `
name: ${nameField.value}
count: ${countField.value}
currency: ${currencyField.value?.id}
color: ${colorField.value?.value}
  `
  alert(dataFormToString)
}
</script>

<template>
  <form class="form-add-check" @submit.prevent="submitForm">
    <InputWithIcon>
      <template #input>
        <InputName v-model:model-value="nameField" />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="money">
      <template #input>
        <InputCurrency
          v-model:checked-value="currencyField"
          :currencies="currencies"
          :defaultValue="currencies[0]"
        />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="account_balance">
      <template #input>
        <InputCount v-model:model-value="countField" :prefix="currencyField?.symbol" />
      </template>
    </InputWithIcon>
    <InputList header="Цвет">
      <template #content>
        <InputChoseColor v-model:checked-value="colorField" />
      </template>
    </InputList>
    <SubmitFormButtons />
  </form>
</template>

<style lang="scss" scoped>
.form-add-check {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;

  gap: 16px;
  margin-top: 32px;
}
</style>
