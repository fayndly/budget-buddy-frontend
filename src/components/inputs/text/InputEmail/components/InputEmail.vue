<script setup lang="ts">
import { staticAttributesInputEmail } from '../constants/staticAttributes'
import type { IPropsInputEmail } from '../types/props.types'

withDefaults(defineProps<IPropsInputEmail>(), {})
defineEmits(['update:modelValue'])
</script>

<template>
  <md-outlined-text-field
    v-bind="staticAttributesInputEmail"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :error="hasError"
    :error-text="errors[0]"
  />
</template>
