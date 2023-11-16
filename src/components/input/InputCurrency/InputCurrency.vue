<script setup lang="ts">
import { computed } from 'vue'

import '@material/web/select/outlined-select'
import '@material/web/select/select-option'

import { attributesInputCurrency } from './constants/attributes'

const props = defineProps(['checkedValue', 'currencies', 'defaultValue'])
const emit = defineEmits(['update:checkedValue'])

const value = computed({
  get() {
    if (props.checkedValue) {
      return props.checkedValue
    } else {
      emit('update:checkedValue', props.defaultValue)
      return props.defaultValue
    }
  },
  set(value) {
    emit('update:checkedValue', value)
  }
})
</script>

<template>
  <md-outlined-select v-bind="attributesInputCurrency" v-model="value">
    <md-select-option
      v-for="currency in currencies"
      :key="currency.id"
      :selected="currency.id === value.id"
      :value="currency"
    >
      <div slot="headline">{{ currency.name }}</div>
    </md-select-option>
  </md-outlined-select>
</template>
