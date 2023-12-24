<script setup lang="ts">
import { onMounted } from 'vue'
import '@material/web/iconbutton/filled-icon-button'
import '@material/web/button/filled-tonal-button'

import 'material-icons/iconfont/material-icons.css'
import AppLayout from '@/layouts/AppLayout.vue'

// import { apiManager } from '@/utils/API/index'

// onMounted(async () => {
//   // await apiManager
//   //   .postAuthSignup({ userName: 'fayndly', email: 'fayndly1@gmail.com', password: '1234567' })
//   //   .then((response: any) => {
//   //     console.log(response)
//   //   })
//   //   .catch((error: any) => {
//   //     console.log(error.response.data)
//   //   })
//   await apiManager
//     .postAuthLogin({ email: 'fayndly1@gmail.com', password: '1234567' })
//     .then((response) => {
//       console.log(response)
//       const token = response.data.token
//       localStorage.setItem('token', token)
//       console.log(localStorage.getItem('token'))
//     })
//     .catch((error: any) => {
//       console.log(error)
//     })
//   await apiManager
//     .getAuthCheck()
//     .then((response) => {
//       console.log(response)
//     })
//     .catch((error: any) => {
//       console.log(error.response.data)
//     })
// })
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
