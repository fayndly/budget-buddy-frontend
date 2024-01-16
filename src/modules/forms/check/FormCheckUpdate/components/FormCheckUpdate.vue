<script setup lang="ts">
import { reactive, ref, watch, onMounted, computed } from 'vue'

import BarSnackbar from '@/components/bars/BarSnackbar/BarSnackbar.vue'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'

import { InputName } from '@/components/inputs/text/InputName'
import { InputAmount } from '@/components/inputs/text/InputAmount'
import { InputSelectCurrency } from '@/components/inputs/select/InputSelectCurrency'
import SubmitFormButtons from '@/components/submit/SubmitFormButtons/SubmitFormButtons.vue'

import type { IFormFields } from '../types/formFields.types'
import type { TTypeTransaction, ICurrency } from '@/utils/types/data/data.types'

import useVuelidate from '@vuelidate/core'
import { ValidationErrors } from '@/utils/validations/validationErrors'
import { rules } from '../helpers/useValidateForm'

import { usePatchCheckUpdate, postErrorText, serverValidateErrors } from '../services/useSubmitForm'

import { getById } from '@/utils/helpers/getById'

import { useGetOneCheck, check, isCheckNotFound } from '../services/useGetOneCheck'
import { useGetCurrencies, currencies } from '../services/useGetCurrencies'

const formData = reactive<IFormFields>({
  name: '',
  currency: null,
  amount: 0
})

const validation = useVuelidate(rules, formData, { $externalResults: serverValidateErrors })
const validationErrorsManager = new ValidationErrors(validation)

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const submitForm = async () => {
  validation.value.$clearExternalResults()
  if (!(await validation.value.$validate())) return
  if (route.params.checkId && formData.name && formData.currency)
    await usePatchCheckUpdate(
      route.params.checkId as TTypeTransaction,
      formData.name,
      formData.currency
    )
}

const isSnackbarOpen = ref<boolean>(false)
watch(postErrorText, () => {
  if (postErrorText.value) isSnackbarOpen.value = true
})

const getActiveCurrency = computed(() => {
  if (formData.currency) {
    return getById<ICurrency>(currencies, formData.currency)
  }
  return null
})

onMounted(async () => {
  if (route.params.checkId) {
    await useGetOneCheck(route.params.checkId as TTypeTransaction)
  } else {
    return router.replace({ name: 'NotFounded' })
  }
  if (isCheckNotFound.value) {
    return router.replace({ name: 'NotFounded' })
  }

  await useGetCurrencies()

  if (check.value) {
    formData.name = check.value.name
    formData.currency = check.value.currency
    formData.amount = check.value.amount
  }
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
  <form class="form-update-check" @submit.prevent="submitForm" novalidate>
    <InputWithIcon>
      <template #input>
        <InputName
          v-model:modelValue="formData.name"
          :hasError="validationErrorsManager.isInputHasErrors('name')"
          :errors="validationErrorsManager.getInputErrors('name')"
        />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="money">
      <template #input>
        <InputSelectCurrency
          v-model:modelValue="formData.currency"
          :values="currencies"
          :hasError="validationErrorsManager.isInputHasErrors('currency')"
          :errors="validationErrorsManager.getInputErrors('currency')"
        />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="account_balance">
      <template #input>
        <InputAmount
          label="Первоначальная сумма"
          :isDisabled="true"
          v-model:modelValue="formData.amount"
          :suffixText="getActiveCurrency?.symbol"
          :hasError="validationErrorsManager.isInputHasErrors('amount')"
          :errors="validationErrorsManager.getInputErrors('amount')"
        />
      </template>
    </InputWithIcon>
    <SubmitFormButtons />
  </form>
</template>

<style lang="scss" scoped>
.form-update-check {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;

  gap: 16px;
  margin-top: 32px;
}
</style>
