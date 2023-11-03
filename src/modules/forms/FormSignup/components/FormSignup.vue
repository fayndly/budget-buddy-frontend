<script setup lang="ts">
import InputPassword from '@/components/input/InputPassword.vue'

import '@material/web/textfield/outlined-text-field'
import '@material/web/button/filled-button'

import { propsInputName, propsInputEmail, propsInputPassword } from '../constants/Inputs'

const submitForm = (data: any) => {
  console.log(data)
}
</script>

<template>
  <form class="form-signup" @submit.prevent="submitForm">
    <md-outlined-text-field class="form-signup__input" v-bind="propsInputName" />
    <md-outlined-text-field class="form-signup__input" v-bind="propsInputEmail" />
    <InputPassword class="form-signup__input" />
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
