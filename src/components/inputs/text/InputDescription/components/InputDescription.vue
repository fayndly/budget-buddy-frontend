<script setup lang="ts">
import { staticAttributesInputDescription } from '../constants/staticAttributes'
import type { IPropsInputDescription } from '../types/props.types'

defineProps<IPropsInputDescription>()
defineEmits(['update:modelValue'])
</script>

<template>
  <md-outlined-text-field
    class="textarea"
    v-bind="staticAttributesInputDescription"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :error="hasError"
    :error-text="errors[0]"
  />
</template>
<style lang="scss" scoped>
.textarea {
  min-height: 100px;
}
</style>
