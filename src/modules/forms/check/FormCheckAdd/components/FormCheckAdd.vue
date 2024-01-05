<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'

import SubmitFormButtons from '@/components/submit/SubmitFormButtons/SubmitFormButtons.vue'

import type { ICurrency } from '@/utils/types/interfaces'
//
import { InputName } from '@/components/inputs/text/InputName'
import { InputCount } from '@/components/inputs/text/InputCount'
import { InputSelectCurrency } from '@/components/inputs/select/InputSelectCurrency'
import type { IFormFields } from '../types/formFields.types'

import useVuelidate from '@vuelidate/core'
import { ValidationErrors } from '@/utils/validations/validationErrors'
import { rules } from '../helpers/useValidateForm'

import {
  usePostCheckAdd,
  postErrorText,
  serverValidateErrors,
  isButtonSubmitAuthLoading
} from '../services/useSubmitForm'
import { useGetCurrencies } from '../services/useGetCurrencies'

const currencies = ref([])

const formData = reactive<IFormFields>({
  name: '',
  currency: null,
  count: 0
})

const validation = useVuelidate(rules, formData, { $externalResults: serverValidateErrors })
const validationErrorsManager = new ValidationErrors(validation)

const submitForm = async () => {
  validation.value.$clearExternalResults()
  if (!(await validation.value.$validate())) return
  await usePostCheckAdd(formData.name, formData.currency, formData.count)
}

onMounted(async () => {
  currencies.value = await useGetCurrencies()
  currencies.value.forEach((val) => {
    val.id = val._id
    delete val._id
    delete val.__v
  })
})
</script>

<template>
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
        <InputCount
          label="Первоначальная сумма"
          v-model:modelValue="formData.count"
          suffixText="P"
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
