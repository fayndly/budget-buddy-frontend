<script setup lang="ts">
import { onMounted } from 'vue'

import 'material-icons/iconfont/material-icons.css'

import AppLayout from '@/layouts/AppLayout.vue'

import { authApi } from '@/utils/API/'

import { isAxiosError } from 'axios'
import type { IErrorData } from '@/utils/API/types/error.types'

onMounted(async () => {
  try {
    const { data } = await authApi.checkMe()
    console.log(data)
  } catch (error) {
    if (isAxiosError<IErrorData>(error) && error.response) {
      const response = error.response
      console.log(response.data)
    } else {
      console.log(error)
    }
  }
})
</script>

<template>
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
