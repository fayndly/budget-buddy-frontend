<script setup lang="ts">
import { ref, onMounted, watch, reactive, computed } from 'vue'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'
import InputList from '@/components/input/InputList/InputList.vue'
import BarSnackbar from '@/components/bars/BarSnackbar/BarSnackbar.vue'

import { InputName } from '@/components/inputs/text/InputName'
import { InputSelectType } from '@/components/inputs/select/InputSelectType'
import { InputSelectCurrency } from '@/components/inputs/select/InputSelectCurrency'
import { InputAmount } from '@/components/inputs/text/InputAmount'
import { InputSelectCheck } from '@/components/inputs/select/InputSelectCheck'
import { InputChoseCategory } from '@/modules/inputs/InputChoseCategory'
import { InputChoseDate } from '@/modules/inputs/InputChoseDate'
import { InputDescription } from '@/components/inputs/text/InputDescription'

import SubmitFormButtons from '@/components/submit/SubmitFormButtons/SubmitFormButtons.vue'

import type { ICurrency, ICheck } from '@/utils/types/data/data.types'

import type { IFormFields } from '../types/formFields.types'

import useVuelidate from '@vuelidate/core'
import { ValidationErrors } from '@/utils/validations/validationErrors'
import { rules } from '../helpers/useValidateForm'

import {
  usePostTransactionAdd,
  postErrorText,
  serverValidateErrors
} from '../services/useSubmitForm'

import { currencies, useGetCurrencies } from '../services/useGetCurrencies'
import { categories, useGetCategories } from '../services/useGetCategories'
import { checks, useGetChecks } from '../services/useGetChecks'

import { useRoute, useRouter } from 'vue-router'

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
const emits = defineEmits(['updateType'])
watch(getType, async () => {
  if (formData.type) {
    await useGetCategories(formData.type)

    emits('updateType', formData.type)
  }
})

import { useQueryHandler } from '../helpers/useQueryHandler'

const route = useRoute()

onMounted(async () => {
  await useGetCurrencies()
  await useGetChecks()
  useQueryHandler(route, formData)
  if (getActiveCheck.value?.currency) formData.currency = getActiveCheck.value?.currency
})
const router = useRouter()

const clickButtonAddCategoryHandler = () => {
  router.push({ name: 'CategoryAdd', query: { type: formData.type } })
}

const submitForm = async () => {
  validation.value.$clearExternalResults()
  if (!(await validation.value.$validate())) return

  if (formData.type && formData.currency && formData.check && formData.category && formData.time)
    await usePostTransactionAdd(
      formData.name,
      formData.type,
      formData.currency,
      formData.amount,
      formData.check,
      formData.category,
      formData.time.toISOString(),
      formData.description
    )
}

const isSnackbarOpen = ref<boolean>(false)
watch(postErrorText, () => {
  if (postErrorText.value) isSnackbarOpen.value = true
})

import { getById } from '@/utils/helpers/getById'

const getActiveCurrency = computed((): null | ICurrency => {
  if (formData.currency) {
    return getById<ICurrency>(currencies, formData.currency)
  }
  return null
})

const getActiveCheck = computed((): null | ICheck => {
  if (formData.check) {
    return getById<ICheck>(checks, formData.check)
  }
  return null
})

const getSumbolFromType = computed(() => {
  if (formData.type === 'expense') return '-'
  if (formData.type === 'income') return '+'
  return ''
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
  <form class="form-add-transaction" @submit.prevent="submitForm" novalidate>
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
        />
      </template>
    </InputList>
    <InputList header="Дата" :errrors="validationErrorsManager.getInputErrors('time')">
      <template #content>
        <InputChoseDate v-model:modelValue="formData.time" />
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
.form-add-transaction {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;

  gap: 16px;
  margin-top: 32px;
}
</style>
