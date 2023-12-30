<script setup lang="ts">
import { staticAttributesInputCount } from '../constants/attributes'
import type { IPropsInputCount } from '../types/props.types'

withDefaults(defineProps<IPropsInputCount>(), {
  label: 'Сумма'
})
defineEmits(['update:modelValue'])
</script>

<template>
  <md-outlined-text-field
    v-bind="staticAttributesInputCount"
    :label="label"
    :prefix-text="prefix"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :error="hasError"
    :error-text="errors[0]"
  />
</template>
