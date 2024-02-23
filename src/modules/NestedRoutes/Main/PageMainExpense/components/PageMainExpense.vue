<script setup lang="ts">
import { onMounted } from 'vue'
import '@material/web/button/text-button'

import { TransactionsVisualInfo } from '@/modules/TransactionsVisualInfo'
import { TransactionsList } from '@/modules/TransactionsList'
import ChoseMonth from '@/components/ChoseMonth/ChoseMonth.vue'

import { storeToRefs } from 'pinia'

import { useBarCheckStore } from '@/modules/BarCheck'
const barCheckStore = useBarCheckStore()
const { chosedCheck } = storeToRefs(barCheckStore)

import { useMainExpenseStore } from '../stores/MainExpenseStore'
const mainExpenseStore = useMainExpenseStore()
const { transactions } = storeToRefs(mainExpenseStore)

import { useTransactionsListExpenseStore } from '../stores/TransactionsListStore'
const transactionsListExpenseStore = useTransactionsListExpenseStore()
const { formatTransactionsList } = storeToRefs(transactionsListExpenseStore)

import { useTransactionsVisualInfoStore } from '../stores/TransactionsVisualInfoStore'
const transactionsVisualInfoStore = useTransactionsVisualInfoStore()
const { formatTransactionsVisualInfo } = storeToRefs(transactionsVisualInfoStore)

import { useMonthStore } from '../stores/MonthStore'
const monthStore = useMonthStore()
const { chosedMonth } = storeToRefs(monthStore)

onMounted(async () => {
  if (chosedCheck.value) {
    if (!transactions.value.length) {
      await mainExpenseStore.uploadTransactions()
    }
  }
})

const clickButtonSwapHandler = (side: 'left' | 'right') => {
  const chosedMonthFormatDate = new Date(chosedMonth.value)
  let newMonth = chosedMonthFormatDate.getMonth()
  if (side === 'left') {
    newMonth = chosedMonthFormatDate.getMonth() - 1
  } else if (side === 'right') {
    newMonth = chosedMonthFormatDate.getMonth() + 1
  }
  monthStore.setMonth(new Date(chosedMonthFormatDate.setMonth(newMonth)))
}
</script>

<template>
  <ChoseMonth v-model:modelValue="chosedMonth" typeTitle="expense" />
  <TransactionsVisualInfo
    :formatTransactions="formatTransactionsVisualInfo"
    typeTransactions="expense"
    :currencyCheck="typeof chosedCheck?.currency === 'object' ? chosedCheck?.currency : null"
    @clickButtonSwapLeft="clickButtonSwapHandler('left')"
    @clickButtonSwapRight="clickButtonSwapHandler('right')"
  />
  <TransactionsList :formatTransactions="formatTransactionsList" />
  <md-fab
    variant="primary"
    class="fab-add-transaction"
    aria-label="add"
    @click="
      $router.push({ name: 'TransactionsAdd', query: { type: 'expense', check: chosedCheck?.id } })
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
