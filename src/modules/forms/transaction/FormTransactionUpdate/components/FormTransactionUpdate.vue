<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'
import InputList from '@/components/input/InputList/InputList.vue'

import { InputChoseCategory } from '@/modules/inputs/InputChoseCategory'
import { InputChoseDate } from '@/modules/inputs/InputChoseDate'

import { InputName } from '@/components/inputs/text/InputName'
import { InputDescription } from '@/components/inputs/text/InputDescription'
import { InputSelectType } from '@/components/inputs/select/InputSelectType'
import { InputSelectCurrency } from '@/components/inputs/select/InputSelectCurrency'
import { InputSelectCheck } from '@/components/inputs/select/InputSelectCheck'
import { InputAmount } from '@/components/inputs/text/InputAmount'

import SubmitFormButtons from '@/components/submit/SubmitFormButtons/SubmitFormButtons.vue'

import type { ICurrency, ICategory, ICheck, IDate } from '@/utils/types/data/data.types'
import type { ITypeTransaction } from '@/utils/types/types'

import { useRoute, useRouter } from 'vue-router'

const getCategories = async (): Promise<ICategory[]> => {
  return [
    {
      id: 'category1',
      name: 'Транспорт',
      icon: 'directions_car',
      color: '#FF4F4F'
    },
    {
      id: 'category2',
      name: 'Интернет',
      color: '#5D4FFF',
      icon: 'language'
    },
    {
      id: 'category4',
      name: 'Ресторан',
      color: '#4FB5FF'
    },
    {
      id: 'category5',
      name: 'Походы в туалет',
      color: '#FFC34F'
    },
    {
      id: 'category6',
      name: 'Клубы',
      color: 'rgb(56, 223, 220)'
    },
    {
      id: 'category7',
      name: 'Рыбалка',
      color: 'rgb(35, 53, 143)'
    }
  ]
}
const getCurrencies = async (): Promise<ICurrency[]> => {
  return [
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
}
const getChecks = async (): Promise<ICheck[]> => {
  return [
    {
      name: 'Сбер',
      id: 'check1'
    },
    {
      name: 'Тинькофф',
      id: 'check2'
    }
  ]
}

interface ITransactionData {
  _id: string
  user: string
  type: 'expense' | 'income'
  shortDescription: string
  currency: {
    _id: string
    name: string
    symbol: string
  }
  amount: number
  check: {
    _id: string
    name: string
  }
  category: {
    _id: string
    name: string
    type: 'expense' | 'income'
    color: string
    icon: string
  }
  time: string
  fullDescription: string
  createdAt: string
  updatedAt: string
  __v: number
}
const getTransactionData = async (): Promise<ITransactionData> => {
  return {
    _id: '658429b3de78d0a1e535ecbe',
    user: '65393051366139b39ce5eced',
    type: 'expense',
    shortDescription: 'text',
    currency: {
      _id: '653698b1a2cb054a9a95f3e1',
      name: 'RUB',
      symbol: '₽'
    },
    amount: 12000,
    check: {
      _id: '653fe517ab8e6a94a540064e',
      name: 'сбер'
    },
    category: {
      _id: '65393051366139b39ce5ecf2',
      name: 'Инвестиции',
      type: 'income',
      color: '#1a1a1a',
      icon: 'icon-category-income'
    },
    time: '2023-10-01T00:00:00.000Z',
    fullDescription: 'text',
    createdAt: '2023-12-21T12:04:03.585Z',
    updatedAt: '2023-12-21T12:04:03.585Z',
    __v: 0
  }
}
const transactionData = ref<ITransactionData | null>(null)
onMounted(async () => {
  transactionData.value = await getTransactionData()
})

const currencies = ref<ICurrency[]>([])
const categories = ref<ICategory[]>([])
const checks = ref<ICheck[]>([])

const shortDescriptionField = ref<string>('')
const typeField = ref<ITypeTransaction | null>(null)
const currencyField = ref<ICurrency | null>(null)
const countField = ref<number>(0)
const checkField = ref<string | null>(null)
const categoryField = ref<ICategory>()
const dateField = ref<IDate>()
const fullDescriptionField = ref<string>('')

const emits = defineEmits(['updateType'])
watch(typeField, () => {
  emits('updateType', typeField.value)
})

const submitForm = async () => {
  const dataFormToString = `
short description: ${shortDescriptionField.value}
type: ${typeField.value}
currency id: ${currencyField.value?.id}
count: ${countField.value}
check id: ${checkField.value}
category id: ${categoryField.value?.id}
date: ${dateField.value?.date}
full description: ${fullDescriptionField.value}
  `
  alert(dataFormToString)
}

import { useQueryHandler } from '../helpers/useQueryHandler'

const route = useRoute()
useQueryHandler(route, typeField, checkField)

onMounted(async () => {
  categories.value.push(...(await getCategories()))
  currencies.value.push(...(await getCurrencies()))
  checks.value.push(...(await getChecks()))

  currencyField.value = currencies.value[0]
})
const router = useRouter()

const clickButtonAddCategoryHandler = () => {
  router.push({ name: 'AddCategory', query: { type: typeField.value } })
}
</script>

<template>
  <form class="form-add-transaction" @submit.prevent="submitForm">
    <InputWithIcon>
      <template #input>
        <InputName v-model:model-value="shortDescriptionField" />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="swap_vert">
      <template #input>
        <InputSelectType v-model:selected-value="typeField" />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="attach_money">
      <template #input>
        <InputSelectCurrency v-model:selected-value="currencyField" :values="currencies" />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="price_change">
      <template #input>
        <InputAmount
          label="Сумма"
          v-model:model-value="countField"
          :prefix="currencyField?.symbol"
        />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="account_balance">
      <template #input>
        <InputSelectCheck v-model:selected-value="checkField" :checks="checks" />
      </template>
    </InputWithIcon>
    <InputList header="Категория">
      <template #content>
        <InputChoseCategory
          v-model:checked-value="categoryField"
          :categories="categories"
          @clickButtonAddCategory="clickButtonAddCategoryHandler"
        />
      </template>
    </InputList>
    <InputList header="Дата">
      <template #content>
        <InputChoseDate v-model:checkedValue="dateField" />
      </template>
    </InputList>
    <InputWithIcon icon="description">
      <template #input>
        <InputDescription v-model:model-value="fullDescriptionField" />
      </template>
    </InputWithIcon>
    <SubmitFormButtons />
  </form>
</template>

<style lang="scss" scoped>
.form-add-transaction {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;

  gap: 16px;
  margin-top: 32px;
}
</style>
