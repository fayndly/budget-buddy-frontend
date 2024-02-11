<script setup lang="ts">
import { reactive, ref, watch, onMounted, computed } from 'vue'

import BarSnackbar from '@/components/bars/BarSnackbar/BarSnackbar.vue'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'
import InputList from '@/components/input/InputList/InputList.vue'

import { InputName } from '@/components/inputs/text/InputName'
import { InputSelectType } from '@/components/inputs/select/InputSelectType'
import { InputSelectCurrency } from '@/components/inputs/select/InputSelectCurrency'
import { InputAmount } from '@/components/inputs/text/InputAmount'
import { InputSelectCheck } from '@/components/inputs/select/InputSelectCheck'
import { InputChoseCategory } from '@/modules/inputs/InputChoseCategory'
import { InputChoseDate } from '@/modules/inputs/InputChoseDate'
import { InputDescription } from '@/components/inputs/text/InputDescription'
import SubmitFormButtons from '@/components/submit/SubmitFormButtons/SubmitFormButtons.vue'

import type { IFormFields } from '../types/formFields.types'
import type { TMongoObjectId, ICurrency } from '@/utils/types/data/data.types'

import useVuelidate from '@vuelidate/core'
import { ValidationErrors } from '@/utils/validations/validationErrors'
import { rules } from '../helpers/useValidateForm'

import {
  usePatchTransactionUpdate,
  postErrorText,
  serverValidateErrors
} from '../services/useSubmitForm'

import { getById } from '@/utils/helpers/getById'

import {
  useGetOneTransaction,
  transaction,
  isTransactionNotFound
} from '../services/useGetOneTransaction'
import { currencies, useGetCurrencies } from '../services/useGetCurrencies'
import { categories, useGetCategories } from '../services/useGetCategories'
import { checks, useGetChecks } from '../services/useGetChecks'

const formData = reactive<IFormFields>({
  name: '',
  type: null,
  currency: null,
  amount: 0,
  check: null,
  category: null,
  time: null,
  description: ''
})

const validation = useVuelidate(rules, formData, { $externalResults: serverValidateErrors })
const validationErrorsManager = new ValidationErrors(validation)

const getType = computed(() => formData.type)
watch(getType, async () => {
  if (formData.type) {
    await useGetCategories(formData.type)
  }
})

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const submitForm = async () => {
  validation.value.$clearExternalResults()
  if (!(await validation.value.$validate())) return

  const formatData = Object.assign({}, formData) as any
  formatData.time = formatData.time?.toISOString()
  await usePatchTransactionUpdate(route.params.transactionId as TMongoObjectId, formatData)
}

const isSnackbarOpen = ref<boolean>(false)
watch(postErrorText, () => {
  if (postErrorText.value) isSnackbarOpen.value = true
})

const emits = defineEmits(['notFounded', 'isLoading'])
watch(isTransactionNotFound, () => {
  emits('notFounded', isTransactionNotFound.value)
})

const isLoading = ref<boolean>(false)
watch(isLoading, () => {
  emits('isLoading', isLoading.value)
})

const getActiveCurrency = computed(() => {
  if (formData.currency) {
    return getById<ICurrency>(currencies, formData.currency)
  }
  return null
})

const clickButtonAddCategoryHandler = () => {
  router.push({ name: 'CategoriesAdd', query: { type: formData.type } })
}

const getSumbolFromType = computed(() => {
  if (formData.type === 'expense') return '-'
  if (formData.type === 'income') return '+'
  return ''
})

onMounted(async () => {
  isLoading.value = true

  if (route.params.transactionId) {
    await useGetOneTransaction(route.params.transactionId as TMongoObjectId)
  } else {
    isTransactionNotFound.value = true
  }

  await useGetCurrencies()
  await useGetChecks()

  if (transaction.value) {
    formData.name = transaction.value.name
    formData.type = transaction.value.type
    if (transaction.value.currency) {
      if (typeof transaction.value.currency === 'object')
        formData.currency = transaction.value.currency.id
      if (typeof transaction.value.currency === 'string')
        formData.currency = transaction.value.currency
    } else {
      formData.currency = transaction.value.currency
    }
    formData.amount = transaction.value.amount
    if (transaction.value.check) {
      if (typeof transaction.value.check === 'object') formData.check = transaction.value.check.id
      if (typeof transaction.value.check === 'string') formData.check = transaction.value.check
    } else {
      formData.check = transaction.value.check
    }
    // if (transaction.value.category) {
    //   if (typeof transaction.value.category === 'object')
    //     formData.category = transaction.value.category.id
    //   if (typeof transaction.value.category === 'string')
    //     formData.category = transaction.value.category
    // } else {
    //   formData.category = transaction.value.category
    // }
    formData.description = transaction.value.description
  }

  isLoading.value = false
})

const getDefalutCategory = computed(() => {
  if (transaction.value) {
    if (typeof transaction.value?.category === 'object' && transaction.value?.category) {
      return transaction.value?.category.id
    }
    if (typeof transaction.value?.category === 'string' && transaction.value?.category) {
      return transaction.value?.category
    }
  }
  return null
})
</script>

<template>
  <Teleport to="#app">
    <BarSnackbar
      :title="postErrorText"
      :isOpen="isSnackbarOpen"
      @clickButtonClose="isSnackbarOpen = false"
    />
  </Teleport>
  <form class="form-update-transaction" @submit.prevent="submitForm" novalidate>
    <InputWithIcon>
      <template #input>
        <InputName
          v-model:modelValue="formData.name"
          :hasError="validationErrorsManager.isInputHasErrors('name')"
          :errors="validationErrorsManager.getInputErrors('name')"
        />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="swap_vert">
      <template #input>
        <InputSelectType
          v-model:modelValue="formData.type"
          :hasError="validationErrorsManager.isInputHasErrors('type')"
          :errors="validationErrorsManager.getInputErrors('type')"
        />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="attach_money">
      <template #input>
        <InputSelectCurrency
          v-model:modelValue="formData.currency"
          :values="currencies"
          :hasError="validationErrorsManager.isInputHasErrors('currency')"
          :errors="validationErrorsManager.getInputErrors('currency')"
        />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="price_change">
      <template #input>
        <InputAmount
          v-model:modelValue="formData.amount"
          :suffixText="getActiveCurrency?.symbol"
          :prefixText="getSumbolFromType"
          :hasError="validationErrorsManager.isInputHasErrors('amount')"
          :errors="validationErrorsManager.getInputErrors('amount')"
        />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="account_balance">
      <template #input>
        <InputSelectCheck
          v-model:modelValue="formData.check"
          :values="checks"
          :hasError="validationErrorsManager.isInputHasErrors('check')"
          :errors="validationErrorsManager.getInputErrors('check')"
        />
      </template>
    </InputWithIcon>
    <InputList header="Категория" :errrors="validationErrorsManager.getInputErrors('category')">
      <template #content>
        <InputChoseCategory
          v-model:modelValue="formData.category"
          :values="categories"
          @clickButtonAddCategory="clickButtonAddCategoryHandler"
          :defaultValue="getDefalutCategory"
        />
      </template>
    </InputList>
    <InputList header="Дата" :errrors="validationErrorsManager.getInputErrors('time')">
      <template #content>
        <InputChoseDate v-model:modelValue="formData.time" :defaultValue="transaction?.time" />
      </template>
    </InputList>
    <InputWithIcon icon="description">
      <template #input>
        <InputDescription
          v-model:modelValue="formData.description"
          :hasError="validationErrorsManager.isInputHasErrors('description')"
          :errors="validationErrorsManager.getInputErrors('description')"
        />
      </template>
    </InputWithIcon>
    <SubmitFormButtons />
  </form>
</template>

<style lang="scss" scoped>
.form-update-transaction {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;

  gap: 16px;
  margin-top: 32px;
}
</style>
