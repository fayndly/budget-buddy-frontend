<script setup lang="ts">
import CardTransaction from '@/components/cards/CardTransaction/CardTransaction.vue'
import WrapperTransactionCards from '@/components/wrappers/WrapperTransactionCards/WrapperTransactionCards.vue'

import type { IPropsTransactionsList } from '../types/props.types'

defineProps<IPropsTransactionsList>()
</script>

<template>
  <div class="transactions-list-empty" v-if="!isLoading && !formatTransactions.length">
    <div class="transactions-list-empty__title">
      <h2 class="transactions-list-empty__header body-large on-background-text">Нет транзакций</h2>
      <p class="transactions-list-empty__text body-medium outline-text">
        Создайте транзакцию кнопкой ниже
      </p>
    </div>
  </div>
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

.section-loader {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.transactions-list-empty {
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 16px;
  &__title {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 8px;
  }
  &__header {
  }
  &__text {
  }
  &__button {
  }
  &__button-icon {
    height: 24px;
    width: 24px;
  }
}
</style>
