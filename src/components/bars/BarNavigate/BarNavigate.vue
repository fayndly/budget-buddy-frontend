<script setup lang="ts">
import { computed } from 'vue'
import '@material/web/iconbutton/icon-button'
import 'material-icons/iconfont/material-icons.css'

import { useRoute } from 'vue-router'
const route = useRoute()
const pageMainIsActive = computed(() => {
  return ['Main', 'MainExpense', 'MainIncome'].includes((route.name as string) || ' ')
})
const pageSettingsIsActive = computed(() => {
  return ['Settings'].includes((route.name as string) || ' ')
})
</script>

<template>
  <nav class="navbar surface-container">
    <md-icon-button :selected="pageMainIsActive" @click="$router.push({ name: 'Main' })">
      <span class="material-icons-outlined">home</span>
      <span class="material-icons-outlined inverse-primary-text" slot="selected">home</span>
    </md-icon-button>
    <md-icon-button :selected="pageSettingsIsActive" @click="$router.push({ name: 'Settings' })">
      <span class="material-icons-outlined">settings</span>
      <span class="material-icons-outlined inverse-primary-text" slot="selected">settings</span>
    </md-icon-button>
  </nav>
</template>

<style lang="scss">
.navbar {
  width: 100%;
  min-height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  z-index: 5;

  transition: background-color 0.2s ease-in-out;
}
</style>
