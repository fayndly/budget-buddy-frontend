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
    <div class="diogram-section">
      <md-icon-button
        class="diogram-section__button-swap-diagram"
        @click="$emit('clickButtonSwapLeft')"
      >
        <ArrowLeftBig />
      </md-icon-button>
      <div class="diogram-section__loader" v-if="isLoading">
        <md-circular-progress indeterminate></md-circular-progress>
      </div>
      <GraphDiogram
        v-else
        :data="formatTransactions"
        :typeTransactions="typeTransactions"
        :currencyCheck="currencyCheck"
      />
      <md-icon-button
        class="diogram-section__button-swap-diagram"
        @click="$emit('clickButtonSwapRight')"
      >
        <ArrowRightBig />
      </md-icon-button>
    </div>
    <ul class="categpries-list" v-if="formatTransactions.length">
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

.diogram-section {
  display: flex;
  align-items: center;
  &__button-swap-diagram {
    height: 100px;
  }
  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 220px;
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
