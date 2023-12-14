<script setup lang="ts">
import '@material/web/tabs/primary-tab'
import '@material/web/tabs/tabs'

const tabs = [
  {
    name: 'Расходы',
    routeName: 'CategoriesExpense',
    routeTo: {
      name: 'CategoriesExpense'
    }
  },
  {
    name: 'Доходы',
    routeName: 'CategoriesIncome',
    routeTo: {
      name: 'CategoriesIncome'
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
