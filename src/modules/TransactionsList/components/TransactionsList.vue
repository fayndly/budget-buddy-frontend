<script setup lang="ts">
import CardTransaction from '@/components/cards/CardTransaction/CardTransaction.vue'
import WrapperTransactionCards from '@/components/wrappers/WrapperTransactionCards/WrapperTransactionCards.vue'

const tyransactions = [
  {
    date: '3 Февраля',
    transactions: [
      {
        shordDescription: 'Починка двигателя',
        color: '#FF4F4F',
        icon: 'directions_car',
        categoryName: 'Транспорт',
        count: 12345,
        cyrrancy: '₽'
      },
      {
        shordDescription: 'Оплата интернета',
        color: '#5D4FFF',
        icon: 'language',
        categoryName: 'Интернет',
        count: 6544,
        cyrrancy: '₽'
      },
      {
        shordDescription: 'Поход в ресторан',
        color: '#4FB5FF',
        categoryName: 'Ресторан',
        count: 8743,
        cyrrancy: '₽'
      }
    ]
  },
  {
    date: '2 Февраля',
    transactions: [
      {
        shordDescription: 'Починка двигателя',
        color: '#FF4F4F',
        icon: 'directions_car',
        categoryName: 'Транспорт',
        count: 12345,
        cyrrancy: '₽'
      },
      {
        shordDescription: 'Оплата интернета',
        color: '#5D4FFF',
        icon: 'language',
        categoryName: 'Интернет',
        count: 6544,
        cyrrancy: '₽'
      },
      {
        shordDescription: 'Поход в ресторан',
        color: '#4FB5FF',
        categoryName: 'Ресторан',
        count: 8743,
        cyrrancy: '₽'
      }
    ]
  },
  {
    date: '1 Февраля',
    transactions: [
      {
        shordDescription: 'Починка двигателя',
        color: '#FF4F4F',
        icon: 'directions_car',
        categoryName: 'Транспорт',
        count: 12345,
        cyrrancy: '₽'
      },
      {
        shordDescription: 'Оплата интернета',
        color: '#5D4FFF',
        icon: 'language',
        categoryName: 'Интернет',
        count: 6544,
        cyrrancy: '₽'
      },
      {
        shordDescription: 'Поход в ресторан',
        color: '#4FB5FF',
        categoryName: 'Ресторан',
        count: 8743,
        cyrrancy: '₽'
      }
    ]
  }
]
</script>

<template>
  <ul class="transactions-list">
    <li v-for="(cards, index) in tyransactions" :key="index">
      <WrapperTransactionCards :title="cards.date"
        ><li
          v-for="(card, index) in cards.transactions"
          :key="index"
          class="list-cards-transaction__item"
        >
          <CardTransaction
            :shordDescription="card.shordDescription"
            :color="card.color"
            :icon="card.icon"
            :categoryName="card.categoryName"
            :count="card.count"
            :cyrrancy="card.cyrrancy"
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
