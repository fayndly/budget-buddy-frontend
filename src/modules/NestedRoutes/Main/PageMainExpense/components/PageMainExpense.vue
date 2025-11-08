<script setup lang="ts">
import { onMounted } from 'vue'
import '@material/web/button/text-button'

import { TransactionsVisualInfo } from '@/modules/TransactionsVisualInfo'
import { TransactionsList } from '@/modules/TransactionsList'

import { storeToRefs } from 'pinia'

import { useBarCheckStore } from '@/modules/BarCheck'
const barCheckStore = useBarCheckStore()
const { chosedCheck } = storeToRefs(barCheckStore)

import { useMainExpenseStore } from '../stores/MainExpenseStore'
const mainExpenseStore = useMainExpenseStore()
const { transactions, isTransactionsExpenseLoading } = storeToRefs(mainExpenseStore)

import { useTransactionsListExpenseStore } from '../stores/TransactionsListStore'
const transactionsListExpenseStore = useTransactionsListExpenseStore()
const { formatTransactionsList, isTransactionsListExpenseLoading } = storeToRefs(
  transactionsListExpenseStore
)

import { useTransactionsVisualInfoStore } from '../stores/TransactionsVisualInfoStore'
const transactionsVisualInfoStore = useTransactionsVisualInfoStore()
const { formatTransactionsVisualInfo } = storeToRefs(transactionsVisualInfoStore)

import { ChoseMonth, setNeighborMonth } from '@/modules/ChoseMonth'

onMounted(() => {
  if (!formatTransactionsVisualInfo.value.length && transactions.value.length) {
    transactionsVisualInfoStore.uploadTransactions()
  }
  if (!formatTransactionsList.value.length && transactions.value.length) {
    transactionsListExpenseStore.uploadTransactions()
  }
})
</script>

<template>
  <ChoseMonth typeTitle="expense" />
  <TransactionsVisualInfo
    :formatTransactions="formatTransactionsVisualInfo"
    typeTransactions="expense"
    :currencyCheck="typeof chosedCheck?.currency === 'object' ? chosedCheck?.currency : null"
    @clickButtonSwapLeft="setNeighborMonth('previous')"
    @clickButtonSwapRight="setNeighborMonth('next')"
    :isLoading="isTransactionsListExpenseLoading || isTransactionsExpenseLoading"
  />
  <TransactionsList
    :formatTransactions="formatTransactionsList"
    :isLoading="isTransactionsListExpenseLoading || isTransactionsExpenseLoading"
  />
  <md-fab
    variant="primary"
    class="fab-add-transaction"
    aria-label="add"
    @click="
      $router.push({
        name: 'TransactionsAdd',
        query: { type: 'expense', check: chosedCheck?.id }
      })
    "
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
