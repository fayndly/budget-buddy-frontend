<script setup lang="ts">
import { staticAttributesInputAmount } from '../constants/attributes'
import type { IPropsInputAmount } from '../types/props.types'

withDefaults(defineProps<IPropsInputAmount>(), {
  label: 'Сумма'
})
defineEmits(['update:modelValue'])
</script>

<template>
  <md-outlined-text-field
    v-bind="staticAttributesInputAmount"
    :label="label"
    :prefix-text="prefixText"
    :suffix-text="suffixText"
    :value="modelValue"
    @input="$emit('update:modelValue', Number($event.target.value))"
    :error="hasError"
    :error-text="errors[0]"
  />
</template>
