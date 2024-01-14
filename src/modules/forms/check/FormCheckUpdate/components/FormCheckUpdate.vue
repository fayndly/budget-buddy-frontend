<script setup lang="ts">
import { ref, onMounted } from 'vue'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'

import { InputAmount } from '@/components/inputs/text/InputAmount'
import { InputSelectCurrency } from '@/components/inputs/select/InputSelectCurrency'
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
interface ICheckData {
  transactions: {
    expense: string[]
    income: string[]
  }
  _id: string
  user: string
  name: string
  amount: number
  currency: {
    id: string
    name: string
    symbol: string
  }
  createdAt: string
  updatedAt: string
  __v: number
}

const checkData = ref<ICheckData | null>(null)

const getCheckData = async (): Promise<ICheckData> => {
  return {
    transactions: {
      expense: ['653fe533ab8e6a94a540065b', '658429b3de78d0a1e535ecbe'],
      income: []
    },
    _id: '653fe517ab8e6a94a540064e',
    user: '65393051366139b39ce5eced',
    name: 'сбер',
    amount: -24000,
    currency: {
      id: '123',
      name: 'RUB',
      symbol: '₽'
    },
    createdAt: '2023-10-30T17:17:11.217Z',
    updatedAt: '2023-12-21T12:04:03.853Z',
    __v: 9
  }
}

const nameField = ref<string>('')
const currencyField = ref<ICurrency>()
const countField = ref<number>(0)

const submitForm = async () => {
  const dataFormToString = `
name: ${nameField.value}
count: ${countField.value}
currency: ${currencyField.value?.id}
  `
  alert(dataFormToString)
}

const substituteValuesToForm = (data: ICheckData) => {
  nameField.value = data.name
  currencyField.value = data.currency
  countField.value = data.amount
}

onMounted(async () => {
  checkData.value = await getCheckData()
  substituteValuesToForm(checkData.value)
})
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
        <InputSelectCurrency
          v-model:checked-value="currencyField"
          :currencies="currencies"
          :defaultValue="currencies[0]"
        />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="account_balance">
      <template #input>
        <InputAmount
          label="Первоначальная сумма"
          v-model:model-value="countField"
          :prefix="currencyField?.symbol"
        />
      </template>
    </InputWithIcon>
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
