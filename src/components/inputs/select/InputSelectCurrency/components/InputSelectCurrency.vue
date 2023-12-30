<script setup lang="ts">
import '@material/web/select/outlined-select'
import '@material/web/select/select-option'

import { staticAttributesInputSelectCurrency } from '../constants/attributes'
import type { IPropsInputSelectCurrency } from '../types/props.types'

defineProps<IPropsInputSelectCurrency>()
defineEmits(['update:selectedValue'])
</script>

<template>
  <md-outlined-select
    v-bind="staticAttributesInputSelectCurrency"
    :error="hasError"
    :error-text="errors[0]"
    @change="$emit('update:selectedValue', $event.target.value)"
  >
    <md-select-option
      v-for="currency in values"
      :key="currency.id"
      :selected="currency.id === selectedValue"
      :value="currency.id"
    >
      <div slot="headline">{{ currency.name }}</div>
    </md-select-option>
  </md-outlined-select>
</template>
