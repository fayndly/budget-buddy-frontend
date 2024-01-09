<script setup lang="ts">
import { ref } from 'vue'

import { staticAttributesInputSelectType } from '../constants/attributes'
import type { IPropsInputSelectType } from '../types/props.types'

defineProps<IPropsInputSelectType>()
defineEmits(['update:modelValue'])

const values = ref([
  { id: 'expense', name: 'Расход' },
  { id: 'income', name: 'Доход' }
])
</script>

<template>
  <md-outlined-select
    v-bind="staticAttributesInputSelectType"
    :error="hasError"
    :error-text="errors[0]"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <md-select-option
      v-for="currency in values"
      :key="currency.id"
      :selected="currency.id === modelValue"
      :value="currency.id"
    >
      <div slot="headline">{{ currency.name }}</div>
    </md-select-option>
  </md-outlined-select>
</template>
