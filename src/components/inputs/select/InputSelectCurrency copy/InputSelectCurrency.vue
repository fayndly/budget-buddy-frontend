<script setup lang="ts">
import { ref, watch, onUpdated } from 'vue'

import '@material/web/select/outlined-select'
import '@material/web/select/select-option'

import { attributesInputSelectCurrency } from './constants/attributes'
import type { IPropsInputSelectCurrency } from './constants/props'

import type { ICurrency } from '@/utils/types/interfaces'

const props = defineProps<IPropsInputSelectCurrency>()

const currencyField = ref<ICurrency | null>(null)

const emit = defineEmits(['update:selectedValue'])
watch(currencyField, () => {
  emit('update:selectedValue', currencyField.value)
})
currencyField.value = props.selectedValue
onUpdated(() => {
  currencyField.value = props.selectedValue
})
</script>

<template>
  <md-outlined-select v-bind="attributesInputSelectCurrency" v-model="currencyField">
    <md-select-option
      v-for="currency in currencies"
      :key="currency.id"
      :selected="currencyField?.id === currency.id"
      :value="currency"
    >
      <div slot="headline">{{ currency.name }}</div>
    </md-select-option>
  </md-outlined-select>
</template>
