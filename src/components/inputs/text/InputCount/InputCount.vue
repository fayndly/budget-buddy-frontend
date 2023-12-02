<script setup lang="ts">
import '@material/web/textfield/outlined-text-field'

import { attributesInputCount } from './constants/attributes'

defineProps(['modelValue', 'prefix', 'label'])
defineEmits(['update:modelValue'])
</script>

<template>
  <md-outlined-text-field
    v-bind="attributesInputCount"
    :label="label"
    :prefix-text="prefix"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
