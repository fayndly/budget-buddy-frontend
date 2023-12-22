<script setup lang="ts">
import { computed } from 'vue'

import '@material/web/textfield/outlined-text-field'

import { attributesInputName } from './constants/attributes'

const props = defineProps(['modelValue', 'currencies'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <md-outlined-text-field v-bind="attributesInputName" v-model="value" />
</template>

<style lang="scss"></style>
