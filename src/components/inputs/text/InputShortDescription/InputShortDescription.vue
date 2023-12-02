<script setup lang="ts">
import '@material/web/textfield/outlined-text-field'

import { attributesInputShortDescription } from './constants/attributes'

defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <md-outlined-text-field
    v-bind="attributesInputShortDescription"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
