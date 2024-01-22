<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

import '@material/web/iconbutton/icon-button'

import type { IPropsTransactionsVisualInfo } from '../types/props.types'

import ArrowRightBig from '@/ui/icons/ArrowRightBig.vue'
import ArrowLeftBig from '@/ui/icons/ArrowLeftBig.vue'

import GraphDiogram from '@/components/graphs/GraphDiogram/GraphDiogram.vue'
import CardCategory from '@/components/cards/CardCategory/CardCategory.vue'
import ChoseMonth from './custom/ChoseMonth/ChoseMonth.vue'

import type { ITransaction, ICategory, TMongoObjectId } from '@/utils/types/data/data.types'

import { categories, useGetCategories } from '../services/useGetCategories'
import { getById } from '@/utils/helpers/getById'

import { check, useGetOneCheck } from '../services/useGetOneCheck'
import { currency, useGetOneCurrency } from '../services/useGetOneCurrency'

import { useRoute } from 'vue-router'
const route = useRoute()

watch(route, async () => {
  await useGetOneCheck(route.params.checkId as TMongoObjectId)
})

onMounted(async () => {
  await useGetOneCheck(route.params.checkId as TMongoObjectId)

  check.value?.currency && (await useGetOneCurrency(check.value.currency))
})

const props = defineProps<IPropsTransactionsVisualInfo>()

const getTransactions = computed(() => {
  return props.transactions
})

interface IFormatData {
  amount: number
  category: ICategory | null
  strokeDasharray: number
  strokeDashoffset: number
}

const getFormatData = (transactions: ITransaction[]): IFormatData[] => {
  const formatData: IFormatData[] = []

  transactions.forEach((transaction: ITransaction) => {
    const isDateIncludes = formatData.reduce((acc, val) => {
      if (val.category === transaction.category) {
        val.amount += transaction.amount
        acc = true
      }

      return acc
    }, false)

    if (!isDateIncludes) {
      formatData.push({
        amount: transaction.amount,
        category: transaction.category,
        strokeDasharray: 0,
        strokeDashoffset: 0
      })
    }
  })

  formatData.forEach((val) => {
    val.category = getById<ICategory>(categories, val.category)
  })

  return formatData
}

const formatData = ref<IFormatData[]>([])

watch(getTransactions, async () => {
  await useGetCategories()
  const formatDatas = getFormatData(props.transactions)
  formatData.value = [...formatDatas]
})

const clickButtonSwapHandler = (side: 'left' | 'right') => {
  const chosedMonthFormatDate = new Date(chosedMonth.value)
  let newMonth = chosedMonthFormatDate.getMonth()
  if (side === 'left') {
    newMonth = chosedMonthFormatDate.getMonth() - 1
  } else if (side === 'right') {
    newMonth = chosedMonthFormatDate.getMonth() + 1
  }
  chosedMonth.value = new Date(chosedMonthFormatDate.setMonth(newMonth)).toISOString()
}
</script>

<template>
  <div class="transactions-visual-info">
    <ChoseMonth typeTitle="expense" />
    <div class="graph-diogram-section">
      <md-icon-button class="button-swap-diagram" @click="clickButtonSwapHandler('left')">
        <ArrowLeftBig />
      </md-icon-button>
      <GraphDiogram :data="formatData" typeTransactions="expense" />
      <md-icon-button class="button-swap-diagram" @click="clickButtonSwapHandler('right')">
        <ArrowRightBig />
      </md-icon-button>
    </div>
    <ul class="categpries-list">
      <li v-for="(data, index) in formatData" :key="index">
        <CardCategory :category="data.category" :amount="data.amount" :cyrrancy="currency" />
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
