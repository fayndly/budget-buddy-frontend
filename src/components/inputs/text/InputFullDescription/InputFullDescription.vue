<script setup lang="ts">
import '@material/web/textfield/outlined-text-field'

import { attributesInputFullDescription } from './constants/attributes'

defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <md-outlined-text-field
    class="textarea"
    v-bind="attributesInputFullDescription"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style lang="scss">
.textarea {
  min-height: 100px;
}
</style>
