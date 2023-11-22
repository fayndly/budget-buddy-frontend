<script setup lang="ts">
import { ref } from 'vue'

import '@material/web/textfield/outlined-text-field'

import type { ITypeTransaction } from '@/utils/types/types'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'

import InputCurrency from '@/components/input/InputCurrency/InputCurrency.vue'
import InputShortDescription from './custom/InputShortDescription/InputShortDescription.vue'
import InputTypeTransaction from '@/components/input/InputTypeTransaction/InputTypeTransaction.vue'
import InputCount from '@/components/input/InputCount/InputCount.vue'
import { InputChoseCategory } from '@/modules/inputs/InputChoseCategory'
import { InputChoseDate } from '@/modules/inputs/InputChoseDate'
import InputList from '@/components/input/InputList/InputList.vue'
import SelectCheck from '@/components/selects/SelectCheck/SelectCheck.vue'

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

interface ICategory {
  id: string
}

const shortDescriptionField = ref<string>('')
const typeField = ref<ITypeTransaction>()
const currencyField = ref<ICurrency>()
const countField = ref<number>(0)
const checkField = ref<number>(0)
const categoryField = ref<ICategory>()
const dateField = ref<Date>()
const fullDescriptionField = ref<string>('')

const defaultType = ref<ITypeTransaction>('expense')

interface ICheck {
  name: string
  id: string
}

const checks: ICheck[] = [
  {
    name: 'Сбер',
    id: 'check1'
  },
  {
    name: 'Тинькофф',
    id: 'check2'
  }
]

const submitForm = async () => {
  const dataFormToString = `
short description: ${shortDescriptionField.value}
type: ${typeField.value}
currency: ${currencyField.value?.id}
count: ${countField.value}
check: ${checkField.value}
category: ${categoryField.value}
date: ${dateField.value}
full description: ${fullDescriptionField.value}
  `
  alert(dataFormToString)
}
</script>

<template>
  <form class="form-add-transaction" @submit.prevent="submitForm">
    <InputWithIcon>
      <template #input>
        <InputShortDescription v-model:model-value="shortDescriptionField" />
      </template>
    </InputWithIcon>
    <InputWithIcon>
      <template #input>
        <InputTypeTransaction v-model:checked-value="typeField" :defaultValue="defaultType" />
      </template>
    </InputWithIcon>
    <InputWithIcon>
      <template #input>
        <InputCurrency
          v-model:checked-value="currencyField"
          :currencies="currencies"
          :defaultValue="currencies[0]"
        />
      </template>
    </InputWithIcon>
    <InputWithIcon>
      <template #input>
        <InputCount v-model:model-value="countField" :prefix="currencyField?.symbol" />
      </template>
    </InputWithIcon>
    <InputWithIcon>
      <template #input>
        <SelectCheck
          v-model:checked-value="checkField"
          :checks="checks"
          :defaultCheck="checks[0]"
        />
      </template>
    </InputWithIcon>
    <InputList header="Категория">
      <template #content>
        <InputChoseCategory v-model:checked-value="categoryField" />
      </template>
    </InputList>
    <InputList header="Дата">
      <template #content>
        <InputChoseDate v-model:checkedValue="dateField" />
      </template>
    </InputList>
    <InputWithIcon>
      <template #input>
        <md-outlined-text-field
          class="textarea"
          type="textarea"
          label="Подробное описание..."
          v-model="fullDescriptionField"
        />
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

.textarea {
  min-height: 100px;
}
</style>
