<script setup lang="ts">
// import { ref } from 'vue'
// import '@material/web/iconbutton/filled-icon-button'
// import '@material/web/button/filled-tonal-button'

import 'material-icons/iconfont/material-icons.css'
// import '@material/web/all'
import AppLayout from '@/layouts/AppLayout.vue'

// const schema = ref<'dark' | 'light'>('dark')
// const schemas = {
//   dark: './src/assets/styles/md3/theme.dark.css',
//   light: './src/assets/styles/md3/theme.light.css'
// }
// const choseTheme = () => {
//   const doc = document.getElementById('styles-theme')

//   if (schema.value === 'dark') {
//     schema.value = 'light'
//   } else {
//     schema.value = 'dark'
//   }

//   doc?.setAttribute('href', schemas[schema.value])
// }
</script>

<template>
  <!-- <md-filled-icon-button toggle class="button-theme" @click="choseTheme">
    <span class="material-icons-outlined">dark_mode</span>
    <span slot="selected" class="material-icons-outlined">light_mode</span>
  </md-filled-icon-button> -->
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<style lang="scss">
@import '@/assets/styles/index';

body {
  transition: background-color 0.2s ease-in-out;
  overflow: hidden;
}

.button-theme {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 100;
}

#app {
  display: flex;
  flex-direction: column;

  height: 100svh;
}
</style>
