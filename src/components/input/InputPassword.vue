<script setup lang="ts">
import { ref } from 'vue'

import '@material/web/textfield/outlined-text-field'
import '@material/web/iconbutton/icon-button'

const showPassword = ref(false)
</script>

<template>
  <md-outlined-text-field required label="Пароль" :type="showPassword ? 'text' : 'password'">
    <md-icon-button type="button" @click="showPassword = !showPassword" toggle slot="trailing-icon">
      <span class="material-icons-outlined">visibility</span>
      <span slot="selected" class="material-icons-outlined">visibility_off</span>
    </md-icon-button>
  </md-outlined-text-field>
</template>

<style lang="scss"></style>
