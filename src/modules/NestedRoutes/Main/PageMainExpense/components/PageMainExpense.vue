<script setup lang="ts">
import '@material/web/button/text-button'

import { TransactionsVisualInfo } from '@/modules/TransactionsVisualInfo'
</script>

<template>
  <TransactionsVisualInfo />
  <md-fab
    variant="primary"
    class="fab-add-transaction"
    aria-label="add"
    @click="$router.push({ name: 'AddTransaction', query: { type: 'expense', check: 'check1' } })"
  >
    <span class="material-icons-outlined" slot="icon">add</span>
  </md-fab>
</template>

<style lang="scss">
.fab-add-transaction {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>
