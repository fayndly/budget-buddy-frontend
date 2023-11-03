<script setup lang="ts">
import '@material/web/textfield/filled-text-field'
import { withDefaults } from 'vue'

import type { IInputFilledText } from '@/utils/types/inputs'

withDefaults(defineProps<IInputFilledText>(), {
  type: 'text',
  label: '',
  value: '',
  placeholder: '',
  error: false,
  errorText: ''
})
</script>

<template>
  <md-filled-text-field
    :type="type"
    :label="label"
    :value="value"
    :placeholder="placeholder"
  ></md-filled-text-field>
</template>

<style lang="scss"></style>
