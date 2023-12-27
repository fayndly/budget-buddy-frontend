<script setup lang="ts">
import { staticAttributesInputUserName } from '../constants/staticAttributes'
import type { IPropsInputPassword } from '../types/props.types'

withDefaults(defineProps<IPropsInputPassword>(), {})
defineEmits(['update:modelValue'])
</script>

<template>
  <md-outlined-text-field
    v-bind="staticAttributesInputUserName"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :error="hasError"
    :error-text="errors[0]"
  >
  </md-outlined-text-field>
</template>
