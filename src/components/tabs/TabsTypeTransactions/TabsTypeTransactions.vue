<script setup lang="ts">
import '@material/web/tabs/primary-tab'
import '@material/web/tabs/tabs'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const getTabs = () => {
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
  return tabs
}
</script>

<template>
  <md-tabs class="tabs-type-transactions"
    ><md-primary-tab
      v-for="tab in getTabs()"
      :key="tab.name"
      :active="route.name === tab.routeName"
      @click="router.replace(tab.routeTo)"
      >{{ tab.name }}</md-primary-tab
    ></md-tabs
  >
</template>
