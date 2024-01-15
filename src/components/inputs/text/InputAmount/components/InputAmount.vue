<script setup lang="ts">
import '@material/web/textfield/outlined-text-field'

import { staticAttributesInputAmount } from '../constants/attributes'
import type { IPropsInputAmount } from '../types/props.types'

withDefaults(defineProps<IPropsInputAmount>(), {
  label: 'Сумма',
  isDisabled: false
})
defineEmits(['update:modelValue'])
</script>

<template>
  <md-outlined-text-field
    v-bind="staticAttributesInputAmount"
    :disabled="isDisabled"
    :label="label"
    :prefix-text="prefixText"
    :suffix-text="suffixText"
    :value="modelValue"
    @input="$emit('update:modelValue', Number($event.target.value))"
    :error="hasError"
    :error-text="errors[0]"
  />
</template>
