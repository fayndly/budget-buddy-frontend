<script setup lang="ts">
import '@material/web/textfield/outlined-text-field'

import { staticAttributesInputName } from '../constants/staticAttributes'
import type { IPropsInputName } from '../types/props.types'

defineProps<IPropsInputName>()
defineEmits(['update:modelValue'])
</script>

<template>
  <md-outlined-text-field
    v-bind="staticAttributesInputName"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :error="hasError"
    :error-text="errors[0]"
  />
</template>
