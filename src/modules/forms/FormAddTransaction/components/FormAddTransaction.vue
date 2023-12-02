<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'
import InputList from '@/components/input/InputList/InputList.vue'

import { InputChoseCategory } from '@/modules/inputs/InputChoseCategory'
import { InputChoseDate } from '@/modules/inputs/InputChoseDate'

import InputFullDescription from '@/components/inputs/text/InputFullDescription/InputFullDescription.vue'
import InputShortDescription from '@/components/inputs/text/InputShortDescription/InputShortDescription.vue'
import InputSelectTypeTransaction from '@/components/inputs/select/InputSelectTypeTransaction/InputSelectTypeTransaction.vue'
import InputSelectCurrency from '@/components/inputs/select/InputSelectCurrency/InputSelectCurrency.vue'
import InputSelectCheck from '@/components/inputs/select/InputSelectCheck/InputSelectCheck.vue'
import InputCount from '@/components/inputs/text/InputCount/InputCount.vue'

import SubmitFormButtons from '@/components/submit/SubmitFormButtons/SubmitFormButtons.vue'

import type { ICurrency, ICategory, ICheck, IDate } from '@/utils/types/interfaces'
import type { ITypeTransaction } from '@/utils/types/types'

import { useRoute } from 'vue-router'

const getCategories = async (): Promise<ICategory[]> => {
  return [
    {
      id: 'category1',
      shortDesc: 'Транспорт',
      icon: 'directions_car',
      color: '#FF4F4F'
    },
    {
      id: 'category2',
      shortDesc: 'Интернет',
      color: '#5D4FFF',
      icon: 'language'
    },
    {
      id: 'category4',
      shortDesc: 'Ресторан',
      color: '#4FB5FF'
    },
    {
      id: 'category5',
      shortDesc: 'Походы в туалет',
      color: '#FFC34F'
    },
    {
      id: 'category6',
      shortDesc: 'Клубы',
      color: 'rgb(56, 223, 220)'
    },
    {
      id: 'category7',
      shortDesc: 'Рыбалка',
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
</script>

<template>
  <form class="form-add-transaction" @submit.prevent="submitForm">
    <InputWithIcon>
      <template #input>
        <InputShortDescription v-model:model-value="shortDescriptionField" />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="swap_vert">
      <template #input>
        <InputSelectTypeTransaction v-model:selected-value="typeField" />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="attach_money">
      <template #input>
        <InputSelectCurrency v-model:selected-value="currencyField" :currencies="currencies" />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="price_change">
      <template #input>
        <InputCount
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
        <InputChoseCategory v-model:checked-value="categoryField" :categories="categories" />
      </template>
    </InputList>
    <InputList header="Дата">
      <template #content>
        <InputChoseDate v-model:checkedValue="dateField" />
      </template>
    </InputList>
    <InputWithIcon icon="description">
      <template #input>
        <InputFullDescription v-model:model-value="fullDescriptionField" />
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
