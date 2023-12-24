<script setup lang="ts">
import { reactive } from 'vue'

import '@material/web/button/filled-button'

import { InputEmail } from '@/components/inputs/text/InputEmail'
import { InputPassword } from '@/components/inputs/text/InputPassword'
import TitleFormError from '@/components/titles/TitleFormError.vue'

import type { IFormFields } from '../types/formFields.types'

import useVuelidate from '@vuelidate/core'
import { ValidationErrors } from '@/utils/validations/validationErrors'
import { rules } from '../helpers/useValidateForm'

import { usePostAuthLogin, postErrorText } from '../services/useSubmitForm'

const formData = reactive<IFormFields>({
  email: '',
  password: ''
})

const validation = useVuelidate(rules, formData)
const validationErrorsManager = new ValidationErrors(validation)

const submitForm = async () => {
  const result = await validation.value.$validate()
  if (result) {
    postErrorText.value = null
    console.log(await usePostAuthLogin(formData.email, formData.password))
  } else {
    postErrorText.value = 'Не удалось войти'
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
    <md-filled-button>Войти</md-filled-button>
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
