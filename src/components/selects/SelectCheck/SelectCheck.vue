<script setup lang="ts">
import { computed } from 'vue'

import '@material/web/select/outlined-select'
import '@material/web/select/select-option'

import { attributesInputCurrency } from './constants/attributes'

const props = defineProps(['checkedValue', 'checks', 'defaultCheck'])
const emit = defineEmits(['update:checkedValue'])

const value = computed({
  get() {
    if (props.checkedValue) {
      return props.checkedValue
    } else {
      emit('update:checkedValue', props.defaultCheck)
      return props.defaultCheck
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
      v-for="check in checks"
      :key="check.id"
      :selected="check.id === value.id"
      :value="check"
    >
      <div slot="headline">{{ check.name }}</div>
    </md-select-option>
  </md-outlined-select>
</template>
