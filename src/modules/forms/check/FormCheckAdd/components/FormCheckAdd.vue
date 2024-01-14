<script setup lang="ts">
import { reactive, onMounted, computed, ref, watch } from 'vue'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'

import SubmitFormButtons from '@/components/submit/SubmitFormButtons/SubmitFormButtons.vue'
//
import BarSnackbar from '@/components/bars/BarSnackbar/BarSnackbar.vue'

import { InputName } from '@/components/inputs/text/InputName'
import { InputAmount } from '@/components/inputs/text/InputAmount'
import { InputSelectCurrency } from '@/components/inputs/select/InputSelectCurrency'

import useVuelidate from '@vuelidate/core'
import { ValidationErrors } from '@/utils/validations/validationErrors'
import { rules } from '../helpers/useValidateForm'

import type { IFormFields } from '../types/formFields.types'

import { getById } from '@/utils/helpers/getById'

import { usePostCheckAdd, postErrorText, serverValidateErrors } from '../services/useSubmitForm'
import { useGetCurrencies, currencies } from '../services/useGetCurrencies'
import type { ICurrency } from '@/utils/types/data/data.types'

const formData = reactive<IFormFields>({
  name: '',
  currency: null,
  count: 0
})

const validation = useVuelidate(rules, formData, { $externalResults: serverValidateErrors })
const validationErrorsManager = new ValidationErrors(validation)

const getActiveCurrency = computed(() => {
  if (formData.currency) {
    return getById<ICurrency>(currencies, formData.currency)
  }
  return null
})

const submitForm = async () => {
  validation.value.$clearExternalResults()
  if (!(await validation.value.$validate())) return
  await usePostCheckAdd(formData.name, formData.currency, formData.count)
}

const isSnackbarOpen = ref<boolean>(false)
watch(postErrorText, () => {
  if (postErrorText.value) isSnackbarOpen.value = true
})

onMounted(async () => {
  await useGetCurrencies()
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
  <form class="form-add-check" @submit.prevent="submitForm" novalidate>
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
          v-model:selectedValue="formData.currency"
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
          v-model:modelValue="formData.count"
          :suffixText="getActiveCurrency?.symbol"
          :hasError="validationErrorsManager.isInputHasErrors('count')"
          :errors="validationErrorsManager.getInputErrors('count')"
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
