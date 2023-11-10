<script setup lang="ts">
import { ref } from 'vue'

import '@material/web/button/filled-button'
import '@material/web/button/outlined-button'
import '@material/web/textfield/outlined-text-field'
import '@material/web/iconbutton/icon-button'
import 'material-icons/iconfont/material-icons.css'

import '@material/web/select/outlined-select'
import '@material/web/select/select-option'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'

const currencies = [
  {
    name: 'RUB',
    id: '123',
    symbol: '₽'
  },
  {
    name: 'EUR',
    id: '234',
    symbol: '€'
  }
]

const nameField = ref('')
const currencyField = ref('123')
const countField = ref(0)
const colorField = ref('')

const propsInputName = {
  name: 'name',
  id: 'name',
  required: true,
  label: 'Имя счета',
  type: 'text',
  // maxLength: 320,
  // minLength: 3,
  autocomplete: true
}
const propsInputCount = {
  name: 'count',
  id: 'count',
  required: true,
  label: 'Первоначальная сумма',
  type: 'number',
  // prefixText: '₽',
  suffixText: '.00'
}
const propsInputCurrency = {
  name: 'currency',
  id: 'currency',
  required: true,
  label: 'Валюта'
}

const submitForm = async () => {
  console.log(nameField.value, countField.value, currencyField.value, colorField.value)
}
</script>

<template>
  <form class="form-add-check" @submit.prevent="submitForm">
    <InputWithIcon :inputId="propsInputName.id">
      <template #input>
        <md-outlined-text-field v-bind="propsInputName" v-model="nameField" />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="money" :inputId="propsInputCurrency.id">
      <template #input>
        <md-outlined-select v-bind="propsInputCurrency" v-model="currencyField">
          <md-select-option
            v-for="currency in currencies"
            :key="currency.id"
            :selected="currency.id === currencyField"
            :value="currency.id"
          >
            <div slot="headline">{{ currency.name }}</div>
          </md-select-option>
        </md-outlined-select>
      </template>
    </InputWithIcon>
    <InputWithIcon icon="account_balance" :inputId="propsInputCount.id">
      <template #input>
        <md-outlined-text-field
          :prefix-text="currencies[0].symbol"
          v-bind="propsInputCount"
          v-model="countField"
        />
      </template>
    </InputWithIcon>
    <div class="form-add-check__submit">
      <md-outlined-button type="button">Отмена</md-outlined-button>
      <md-filled-button type="submit">Подтвердить</md-filled-button>
    </div>
  </form>
</template>

<style lang="scss">
.form-add-check {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;

  gap: 16px;
  margin-top: 32px;

  &__submit {
    display: flex;
    gap: 8px;
  }
}
</style>
