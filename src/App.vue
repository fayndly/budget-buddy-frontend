<script setup lang="ts">
import { ref } from 'vue'
import '@material/web/iconbutton/filled-icon-button'

import 'material-icons/iconfont/material-icons.css'

const schema = ref<'dark' | 'light'>('dark')
const schemas = {
  dark: './src/assets/styles/md3/theme.dark.css',
  light: './src/assets/styles/md3/theme.light.css'
}
const choseTheme = () => {
  const doc = document.getElementById('styles-theme')

  if (schema.value === 'dark') {
    schema.value = 'light'
  } else {
    schema.value = 'dark'
  }

  doc?.setAttribute('href', schemas[schema.value])
}
</script>

<template>
  <md-filled-icon-button toggle class="button-theme" @click="choseTheme">
    <span class="material-icons-outlined">dark_mode</span>
    <span slot="selected" class="material-icons-outlined">light_mode</span>
  </md-filled-icon-button>
  <router-view></router-view>
</template>

<style lang="scss">
@import '@/assets/styles/index';

body {
  background-color: var(--md-sys-color-background);
  overflow: hidden;
}

.button-theme {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
