<script setup lang="ts">
import { onMounted } from 'vue'
import '@material/web/button/text-button'

import { TransactionsVisualInfo } from '@/modules/TransactionsVisualInfo'
import { TransactionsList } from '@/modules/TransactionsList'

import { storeToRefs } from 'pinia'

import { useBarCheckStore } from '@/modules/BarCheck'
const barCheckStore = useBarCheckStore()
const { chosedCheck } = storeToRefs(barCheckStore)

import { useMainIncomeStore } from '../stores/MainIncomeStore'
const mainIncomeStore = useMainIncomeStore()
const { transactions, isTransactionsIncomeLoading } = storeToRefs(mainIncomeStore)

import { useTransactionsListIncomeStore } from '../stores/TransactionsListStore'
const transactionsListIncomeStore = useTransactionsListIncomeStore()
const { formatTransactionsList, isTransactionsListIncomeLoading } = storeToRefs(
  transactionsListIncomeStore
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
    transactionsListIncomeStore.uploadTransactions()
  }
})
</script>

<template>
  <ChoseMonth typeTitle="income" />
  <TransactionsVisualInfo
    :formatTransactions="formatTransactionsVisualInfo"
    typeTransactions="income"
    :currencyCheck="typeof chosedCheck?.currency === 'object' ? chosedCheck?.currency : null"
    @clickButtonSwapLeft="setNeighborMonth('previous')"
    @clickButtonSwapRight="setNeighborMonth('next')"
    :isLoading="isTransactionsListIncomeLoading || isTransactionsIncomeLoading"
  />
  <TransactionsList
    :formatTransactions="formatTransactionsList"
    :isLoading="isTransactionsListIncomeLoading || isTransactionsIncomeLoading"
  />
  <md-fab
    variant="primary"
    class="fab-add-transaction"
    aria-label="add"
    @click="
      $router.push({ name: 'TransactionsAdd', query: { type: 'income', check: chosedCheck?.id } })
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
