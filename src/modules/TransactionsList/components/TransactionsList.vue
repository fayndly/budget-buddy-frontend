<script setup lang="ts">
import CardTransaction from '@/components/cards/CardTransaction/CardTransaction.vue'
import WrapperTransactionCards from '@/components/wrappers/WrapperTransactionCards/WrapperTransactionCards.vue'

import type { IPropsTransactionsList } from '../types/props.types'

defineProps<IPropsTransactionsList>()
</script>

<template>
  <ul class="transactions-list">
    <li v-for="(cards, index) in formatTransactions" :key="index">
      <WrapperTransactionCards :title="cards.date"
        ><li v-for="card in cards.transactions" :key="card.id" class="list-cards-transaction__item">
          <CardTransaction
            :id="card.id"
            :name="card.name"
            :currency="typeof card.currency === 'object' ? card.currency : null"
            :amount="card.amount"
            :category="typeof card.category === 'object' ? card.category : null"
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
