<script setup lang="ts">
import { onMounted, watch } from 'vue'
import '@material/web/button/text-button'

import { TransactionsVisualInfo } from '@/modules/TransactionsVisualInfo'
import { TransactionsList } from '@/modules/TransactionsList'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

import { check, useGetOneCheck } from '../services/useGetOneCheck'
import { transactions, useGetTransactions } from '../services/useGetTransactions'

import { useRoute } from 'vue-router'
const route = useRoute()

watch(route, async () => {
  await useGetOneCheck(route.params.checkId as TMongoObjectId)
  await useGetTransactions(check.value?.id, 'expense')
})

onMounted(async () => {
  await useGetOneCheck(route.params.checkId as TMongoObjectId)
  await useGetTransactions(check.value?.id, 'expense')
})
</script>

<template>
  <TransactionsVisualInfo />
  <TransactionsList :transactions="transactions" />
  <md-fab
    variant="primary"
    class="fab-add-transaction"
    aria-label="add"
    @click="$router.push({ name: 'TransactionsAdd', query: { type: 'expense', check: check?.id } })"
  >
    <span class="material-icons-outlined" slot="icon">add</span>
  </md-fab>
</template>

<style lang="scss">
.fab-add-transaction {
  position: fixed;
  bottom: calc(16px + 80px);
  right: 16px;
}
</style>
