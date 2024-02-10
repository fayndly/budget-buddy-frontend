<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import '@material/web/button/text-button'

import { TransactionsVisualInfo } from '@/modules/TransactionsVisualInfo'
import { TransactionsList } from '@/modules/TransactionsList'

// import type { TMongoObjectId } from '@/utils/types/data/data.types'

// import { check, useGetOneCheck } from '../services/useGetOneCheck'
// import { transactions, useGetTransactions } from '../services/useGetTransactions'

// import { useMainExpenseStore } from '../stores/MainExpenseStore'
// import { useBarCheckStore } from '@/modules/BarCheck'
// import { useTransactionsStore } from '@/stores/API/transactions'

// const mainExpenseStore = useMainExpenseStore()
// const barCheckStore = useBarCheckStore()
// const transactionsStore = useTransactionsStore()

// const { transactions } = storeToRefs(mainExpenseStore)
// const { chosedCheck } = storeToRefs(barCheckStore)

onMounted(async () => {
  // await mainExpenseStore.uploadTransactions()
  // const newTransactions = transactions.value.map(async (val) => {
  //   return await transactionsStore.getTransactionById(val.id, {
  //     hasCategory: true,
  //     hasCheck: true,
  //     hasCurrency: true
  //   })
  // })
  // console.log(newTransactions)
})
</script>

<template>
  <!-- <TransactionsVisualInfo :transactions="transactions" />
  <TransactionsList :transactions="transactions" /> -->
  <md-fab
    variant="primary"
    class="fab-add-transaction"
    aria-label="add"
    @click="
      console.log('cluic')

      // $router.push({ name: 'TransactionsAdd', query: { type: 'expense', check: chosedCheck?.id } })
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
