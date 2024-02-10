<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import CardTransaction from '@/components/cards/CardTransaction/CardTransaction.vue'
import WrapperTransactionCards from '@/components/wrappers/WrapperTransactionCards/WrapperTransactionCards.vue'

import {
  getFormatTransactionsList,
  type formatTransactions
} from '../helpers/getFormatTransactionsList'

import type { IPropsTransactionsList } from '../types/props.types'

import { useGetCategories } from '../services/useGetCategories'
import { useGetCurrencies } from '../services/useGetCurrencies'

const props = defineProps<IPropsTransactionsList>()

const arrFormatTransactions = ref<formatTransactions[]>([])

const getTransactions = computed(() => {
  return props.transactions
})

watch(getTransactions, () => {
  arrFormatTransactions.value = getFormatTransactionsList(props.transactions)
})

onMounted(async () => {
  // await useGetCurrencies()
  // await useGetCategories()
})
</script>

<template>
  <ul class="transactions-list">
    <li v-for="(cards, index) in arrFormatTransactions" :key="index">
      <WrapperTransactionCards :title="cards.date"
        ><li v-for="card in cards.transactions" :key="card.id" class="list-cards-transaction__item">
          <CardTransaction
            :id="card.id"
            :name="card.name"
            :currency="card.currency"
            :amount="card.amount"
            :category="card.category"
          /></li
      ></WrapperTransactionCards>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.transactions-list {
  padding-inline-start: 0px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
