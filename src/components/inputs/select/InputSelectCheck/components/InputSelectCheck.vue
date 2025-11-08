<script setup lang="ts">
import { staticAttributesInputSelectCheck } from '../constants/attributes'
import type { IPropsInputSelectCheck } from '../types/props.types'

defineProps<IPropsInputSelectCheck>()
defineEmits(['update:modelValue'])
</script>

<template>
  <md-outlined-select
    v-bind="staticAttributesInputSelectCheck"
    :error="hasError"
    :error-text="errors[0]"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <md-select-option
      v-for="check in values"
      :key="check.id"
      :selected="check.id === modelValue"
      :value="check.id"
    >
      <div slot="headline">{{ check.name }}</div>
    </md-select-option>
  </md-outlined-select>
</template>
