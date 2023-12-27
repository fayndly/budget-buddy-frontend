<script setup lang="ts">
import { reactive } from 'vue'

import '@material/web/button/filled-button'

import { InputEmail } from '@/components/inputs/text/InputEmail'
import { InputPassword } from '@/components/inputs/text/InputPassword'
import { InputUserName } from '@/components/inputs/text/InputUserName'
import TitleFormError from '@/components/titles/TitleFormError.vue'

import type { IFormFields } from '../types/formFields.types'

import useVuelidate from '@vuelidate/core'
import { ValidationErrors } from '@/utils/validations/validationErrors'
import { rules } from '../helpers/useRulesForm'

import { usePostAuthSignup, postErrorText } from '../services/useSubmitForm'

const formData = reactive<IFormFields>({
  userName: '',
  email: '',
  password: ''
})

const validation = useVuelidate(rules, formData)
const validationErrorsManager = new ValidationErrors(validation)

const submitForm = async () => {
  const result = await validation.value.$validate()
  if (result) {
    postErrorText.value = null
    console.log(await usePostAuthSignup(formData.userName, formData.email, formData.password))
  }
}
</script>

<template>
  <TitleFormError v-if="postErrorText" :error="postErrorText" />
  <form class="form-auth" @submit.prevent="submitForm" novalidate>
    <InputUserName
      class="form-auth__input"
      v-model:modelValue="formData.userName"
      :hasError="validationErrorsManager.isInputHasErrors('userName')"
      :errors="validationErrorsManager.getInputErrors('userName')"
    />
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
    <md-filled-button>Зарегистрироваться</md-filled-button>
  </form>
</template>

<style lang="scss">
// .form-signup {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;

//   gap: 12px;

//   &__input {
//     width: 100%;
//   }
// }
</style>
../helpers/useRulesForm
