<script setup lang="ts">
import { reactive } from 'vue'

import { InputEmail } from '@/components/inputs/text/InputEmail'
import { InputPassword } from '@/components/inputs/text/InputPassword'
import TitleFormError from '@/components/titles/TitleFormError.vue'
import { ButtonSubmitAuth } from '@/components/buttons/ButtonSubmitAuth'

import type { IFormFields } from '../types/formFields.types'

import useVuelidate from '@vuelidate/core'
import { ValidationErrors } from '@/utils/validations/validationErrors'
import { rules } from '../helpers/useValidateForm'

import {
  usePostAuthLogin,
  postErrorText,
  serverValidateErrors,
  isButtonSubmitAuthLoading,
  isAuthed
} from '../services/useSubmitForm'

import { useRouter } from 'vue-router'
const router = useRouter()

const formData = reactive<IFormFields>({
  email: '',
  password: ''
})

const validation = useVuelidate(rules, formData, { $externalResults: serverValidateErrors })
const validationErrorsManager = new ValidationErrors(validation)

const submitForm = async () => {
  validation.value.$clearExternalResults()
  if (!(await validation.value.$validate())) return
  await usePostAuthLogin(formData.email, formData.password)

  if (isAuthed.value) {
    router.push({ name: 'Main' })
  }
}
</script>

<template>
  <TitleFormError v-if="postErrorText" :error="postErrorText" />
  <form class="form-auth" @submit.prevent="submitForm" novalidate>
    <InputEmail
      class="form-auth__input"
      v-model:modelValue="formData.email"
      :hasError="validationErrorsManager.isInputHasErrors('email')"
      :errors="validationErrorsManager.getInputErrors('email')"
    />
    <InputPassword
      class="form-auth__input"
      v-model:modelValue="formData.password"
      :hasError="validationErrorsManager.isInputHasErrors('password')"
      :errors="validationErrorsManager.getInputErrors('password')"
    />
    <ButtonSubmitAuth text="Вход" :isLoading="isButtonSubmitAuthLoading" />
  </form>
</template>

<style lang="scss">
.form-auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 12px;

  &__input {
    width: 100%;
  }
}
</style>
