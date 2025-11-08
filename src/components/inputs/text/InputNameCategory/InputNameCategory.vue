<script setup lang="ts">
import '@material/web/textfield/outlined-text-field'

import { attributesInputNameCategory } from './constants/attributes'

defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <md-outlined-text-field
    v-bind="attributesInputNameCategory"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style lang="scss"></style>
