<script setup lang="ts">
import '@material/web/tabs/primary-tab'
import '@material/web/tabs/tabs'

import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  {
    name: 'Расходы',
    routeName: 'MainExpense',
    routeTo: {
      name: 'MainExpense',
      params: route.params
    }
  },
  {
    name: 'Доходы',
    routeName: 'MainIncome',
    routeTo: {
      name: 'MainIncome',
      params: route.params
    }
  }
]
</script>

<template>
  <md-tabs
    ><md-primary-tab
      v-for="tab in tabs"
      :key="tab.name"
      :active="$route.name === tab.routeName"
      @click="$router.push(tab.routeTo)"
      >{{ tab.name }}</md-primary-tab
    ></md-tabs
  >
</template>

<style lang="scss"></style>
