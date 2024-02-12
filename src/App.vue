<script setup lang="ts">
import { onMounted } from 'vue'

import 'material-icons/iconfont/material-icons.css'

import AppLayout from '@/layouts/AppLayout.vue'

import { useChecksStore } from '@/stores/API/checks'
import { useCurrenciesStore } from '@/stores/API/currencies'
// import { useCategoriesStore } from '@/stores/API/categories'

const checksStore = useChecksStore()
const currenciesStore = useCurrenciesStore()
// const categoriesStore = useCategoriesStore()

onMounted(async () => {
  await checksStore.uploadChecks()
  await currenciesStore.uploadCurrencies()
  // await categoriesStore.uploadCategories()
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
