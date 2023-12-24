<script setup lang="ts">
import { ref } from 'vue'
import { staticAttributesInputPassword } from '../constants/staticAttributes'
import type { IPropsInputPassword } from '../types/props.types'

withDefaults(defineProps<IPropsInputPassword>(), {})
defineEmits(['update:modelValue'])

const isPasswordShow = ref(false)
</script>

<template>
  <md-outlined-text-field
    v-bind="staticAttributesInputPassword"
    :type="isPasswordShow ? 'text' : 'password'"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :error="hasError"
    :error-text="errors[0]"
  >
    <md-icon-button
      type="button"
      id="button-hide"
      @click="isPasswordShow = !isPasswordShow"
      :selected="isPasswordShow"
      slot="trailing-icon"
    >
      <span class="material-icons-outlined">visibility</span>
      <span slot="selected" class="material-icons-outlined">visibility_off</span>
    </md-icon-button></md-outlined-text-field
  >
</template>
