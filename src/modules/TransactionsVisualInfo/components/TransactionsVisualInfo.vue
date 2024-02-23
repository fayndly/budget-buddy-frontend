<script setup lang="ts">
import '@material/web/iconbutton/icon-button'

import type { IPropsTransactionsVisualInfo } from '../types/props.types'

import ArrowRightBig from '@/ui/icons/ArrowRightBig.vue'
import ArrowLeftBig from '@/ui/icons/ArrowLeftBig.vue'

import GraphDiogram from '@/components/graphs/GraphDiogram/GraphDiogram.vue'
import CardCategory from '@/components/cards/CardCategory/CardCategory.vue'

defineProps<IPropsTransactionsVisualInfo>()
</script>

<template>
  <div class="transactions-visual-info">
    <div class="graph-diogram-section">
      <md-icon-button class="button-swap-diagram" @click="$emit('clickButtonSwapLeft')">
        <ArrowLeftBig />
      </md-icon-button>
      <GraphDiogram
        :data="formatTransactions"
        :typeTransactions="typeTransactions"
        :currencyCheck="currencyCheck"
      />
      <md-icon-button class="button-swap-diagram" @click="$emit('clickButtonSwapRight')">
        <ArrowRightBig />
      </md-icon-button>
    </div>
    <ul class="categpries-list">
      <li v-for="data in formatTransactions" :key="data.id">
        <CardCategory :category="data.category" :amount="data.amount" :currency="data.currency" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.transactions-visual-info {
  display: flex;
  flex-direction: column;

  gap: 8px;
}

.graph-diogram-section {
  display: flex;
  align-items: center;
}

.button-swap-diagram {
  height: 100px;
  &__left {
  }
  &__right {
  }
}

.categpries-list {
  padding-top: 8px;

  padding-inline-start: 0px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
