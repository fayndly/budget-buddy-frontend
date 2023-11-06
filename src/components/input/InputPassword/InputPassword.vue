<script setup lang="ts">
import { ref } from 'vue'

import '@material/web/textfield/outlined-text-field'
import '@material/web/iconbutton/icon-button'

import { propsInputPassword } from './constants/PropsInput'

const isPasswordShow = ref(false)

defineProps(['value'])
defineEmits(['update:value'])
</script>

<template>
  <md-outlined-text-field
    v-bind="propsInputPassword"
    :type="isPasswordShow ? 'text' : 'password'"
    :value="value"
    @input="$emit('update:value', $event.target.value)"
  >
    <md-icon-button
      type="button"
      id="button-hide"
      @click="isPasswordShow = !isPasswordShow"
      toggle
      slot="trailing-icon"
    >
      <span class="material-icons-outlined">visibility</span>
      <span slot="selected" class="material-icons-outlined">visibility_off</span>
    </md-icon-button>
  </md-outlined-text-field>
</template>
