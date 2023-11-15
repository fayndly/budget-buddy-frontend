<script setup lang="ts">
import { ref } from 'vue'

import '@material/web/button/filled-button'
import '@material/web/button/outlined-button'
import '@material/web/textfield/outlined-text-field'
import '@material/web/iconbutton/filled-tonal-icon-button'
import 'material-icons/iconfont/material-icons.css'

import '@material/web/select/outlined-select'
import '@material/web/select/select-option'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'
import InputList from '@/components/input/InputList/InputList.vue'

import type { IColor } from '@/modules/inputs/InputChoseColor'
import { InputChoseColor } from '@/modules/inputs/InputChoseColor'
import InputCurrency from '@/components/input/InputCurrency/InputCurrency.vue'

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
const colorField = ref<IColor>()

const attributesInputName = {
  name: 'name',
  id: 'name',
  required: true,
  label: 'Имя счета',
  type: 'text'
  // maxLength: 320,
  // minLength: 3,
  // autocomplete: true
}

const attributesInputCurrency = {
  name: 'currency',
  id: 'currency',
  required: true,
  label: 'Валюта'
}

const submitForm = async () => {
  const dataFormToString = `
name: ${nameField.value}
count: ${countField.value}
currency: ${currencyField.value}
color: ${colorField.value?.value}
  `
  alert(dataFormToString)
}
</script>

<template>
  <form class="form-add-check" @submit.prevent="submitForm">
    <InputWithIcon>
      <template #input>
        <md-outlined-text-field v-bind="attributesInputName" v-model="nameField" />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="money">
      <template #input>
        <md-outlined-select v-bind="attributesInputCurrency" v-model="currencyField">
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
    <InputWithIcon icon="account_balance">
      <template #input>
        <InputCurrency v-model:model-value="countField" prefix="₽" />
      </template>
    </InputWithIcon>
    <InputList header="Цвет">
      <template #content>
        <InputChoseColor v-model:checked-value="colorField" />
      </template>
    </InputList>
    <div class="form-add-check__submit">
      <md-outlined-button type="button">Отмена</md-outlined-button>
      <md-filled-button type="submit">Добавить</md-filled-button>
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
