<script setup lang="ts">
import { ref } from 'vue'

import '@material/web/button/filled-button'

import { apiManager } from '@/utils/API/index'

import InputName from './custom/InputName/InputName.vue'
import InputEmail from '@/components/input/InputEmail/InputEmail.vue'
import InputPassword from '@/components/input/InputPassword/InputPassword.vue'

const nameField = ref('')
const emailField = ref('')
const passwordField = ref('')

const submitForm = async () => {
  console.log(nameField.value, emailField.value, passwordField.value)
  await apiManager
    .postAuthSignup({
      userName: nameField.value,
      email: emailField.value,
      password: passwordField.value
    })
    .then((response: any) => {
      console.log(response)
    })
    .catch((error: any) => {
      console.log(error.response.data)
    })
}
</script>

<template>
  <form class="form-auth" @submit.prevent="submitForm">
    <InputName v-model:value="nameField" class="form-auth__input" />
    <InputEmail v-model:value="emailField" class="form-auth__input" />
    <InputPassword v-model:value="passwordField" class="form-auth__input" />
    <md-filled-button type="submit">Подтвердить</md-filled-button>
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
