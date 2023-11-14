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
import InputColor from '@/components/input/InputColor/InputColor.vue'
import InputList from '@/components/input/InputList/InputList.vue'

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

const footballClubs = ref([
  { value: '#7366BD', id: 'c1' },
  { value: '#D36E70', id: 'c2' },
  { value: '#A5A5A5', id: 'c3' },
  { value: '#A8E4A0', id: 'c4' },
  { value: '#65000B', id: 'c5' },
  { value: '#997A8D', id: 'c6' },
  { value: '#FDDDE6', id: 'c7' },
  { value: '#FC74FD', id: 'c8' }
])

const nameField = ref('')
const currencyField = ref('123')
const countField = ref(0)
const colorField = ref('#7366BD')

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
    <InputWithIcon>
      <template #input>
        <md-outlined-text-field v-bind="propsInputName" v-model="nameField" />
      </template>
    </InputWithIcon>
    <InputWithIcon icon="money">
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
    <InputWithIcon icon="account_balance">
      <template #input>
        <md-outlined-text-field
          :prefix-text="currencies[0].symbol"
          v-bind="propsInputCount"
          v-model="countField"
        />
      </template>
    </InputWithIcon>
    <InputList header="Цвет">
      <template #content>
        <ul class="form-add-check__list-colors">
          <li v-for="club in footballClubs" :key="club.id" class="container">
            <InputColor
              :value="club.value"
              :id="club.id"
              name="club"
              :checked="club.value === colorField"
              v-model:checkedValue="colorField"
            />
          </li>
          <li>
            <md-filled-tonal-icon-button type="button">
              <span class="material-icons-outlined">sync</span>
            </md-filled-tonal-icon-button>
          </li>
        </ul>
      </template>
    </InputList>
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

  &__list-colors {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
}
</style>
