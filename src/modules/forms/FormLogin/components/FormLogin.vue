<script setup lang="ts">
import { ref } from 'vue'

import '@material/web/button/filled-button'

import InputEmail from '@/components/input/InputEmail/InputEmail.vue'
import InputPassword from '@/components/input/InputPassword/InputPassword.vue'

const emailField = ref('')
const passwordField = ref('')

const submitForm = async () => {
  console.log(emailField.value, passwordField.value)
}
</script>

<template>
  <form class="form-signup" @submit.prevent="submitForm">
    <InputEmail v-model:value="emailField" class="form-signup__input" />
    <InputPassword v-model:value="passwordField" class="form-signup__input" />
    <md-filled-button type="submit">Подтвердить</md-filled-button>
  </form>
</template>

<style lang="scss">
.form-signup {
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
