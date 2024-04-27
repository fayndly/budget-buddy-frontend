<script setup lang="ts">
import { onMounted } from 'vue'

import 'material-icons/iconfont/material-icons.css'

import AppLayout from '@/layouts/AppLayout.vue'
import { AppErrors } from '@/modules/AppErrors'

import { useChecksStore } from '@/stores/API/checks'
import { useCurrenciesStore } from '@/stores/API/currencies'
import { useCategoriesStore } from '@/stores/API/categories'

import { useMainExpenseStore } from '@/modules/NestedRoutes/Main/PageMainExpense/stores/MainExpenseStore'
import { useMainIncomeStore } from '@/modules/NestedRoutes/Main/PageMainIncome/stores/MainIncomeStore'

const checksStore = useChecksStore()
const currenciesStore = useCurrenciesStore()
const categoriesStore = useCategoriesStore()

useMainExpenseStore()
useMainIncomeStore()

onMounted(async () => {
  await checksStore.uploadChecks()
  await currenciesStore.uploadCurrencies()
  await categoriesStore.uploadCategories()
})
</script>

<template>
  <Teleport to="#app">
    <AppErrors />
  </Teleport>
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
