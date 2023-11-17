<script setup lang="ts">
import { computed } from 'vue'

import '@material/web/select/outlined-select'
import '@material/web/select/select-option'

import { attributesInputCurrency } from './constants/attributes'

const props = defineProps(['checkedValue', 'defaultValue'])
const emit = defineEmits(['update:checkedValue'])

const typesTransactions2 = [
  { name: 'Расход', id: 'expense' },
  { name: 'Доход', id: 'income' }
]

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
      v-for="type in typesTransactions2"
      :key="type.id"
      :selected="type.id === value"
      :value="type.id"
    >
      <div slot="headline">{{ type.name }}</div>
    </md-select-option>
  </md-outlined-select>
</template>
