<script setup lang="ts">
import { ref, computed } from 'vue'

import '@material/web/iconbutton/icon-button'

import ArrowRightBig from '@/ui/icons/ArrowRightBig.vue'
import ArrowLeftBig from '@/ui/icons/ArrowLeftBig.vue'

import GraphDiogram from '@/components/graphs/GraphDiogram/GraphDiogram.vue'
import DialogSetRangeDate from '@/components/dialogs/DialogSetRangeDate/DialogSetRangeDate.vue'
import CardCategory from '@/components/cards/CardCategory/CardCategory.vue'

import { months, getRangeDateFromMonth } from '../helpers/index'

const transactionsData = [
  {
    count: 12345,
    color: '#FF4F4F',
    strokeDasharray: 0,
    strokeDashoffset: 0
  },
  {
    count: 345,
    color: '#5D4FFF',
    strokeDasharray: 0,
    strokeDashoffset: 0
  },
  {
    count: 4253,
    color: '#4FB5FF',
    strokeDasharray: 0,
    strokeDashoffset: 0
  },
  {
    count: 6253,
    color: '#FFC34F',
    strokeDasharray: 0,
    strokeDashoffset: 0
  },
  {
    count: 9876,
    color: '#AAAAAA',
    strokeDasharray: 0,
    strokeDashoffset: 0
  },
  {
    count: 4567,
    color: '#FFF',
    strokeDasharray: 0,
    strokeDashoffset: 0
  }
]

const ButtonAddCustomDateHandler = () => {
  modalSetDateIsOpen.value = true
}

const modalSetDateIsOpen = ref<boolean>(false)

const closeModalHandler = () => {
  modalSetDateIsOpen.value = false
}

const chosedMonth = ref<string>(new Date(Date.now()).toISOString())

const submitDateHandler = (date: Date) => {
  chosedMonth.value = date.toISOString()
}

const getStringChosedMonth = computed((): string => months[new Date(chosedMonth.value).getMonth()])

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

const categpries = [
  {
    color: '#FF4F4F',
    name: 'Транспорт',
    icon: 'directions_car',
    count: 12345,
    cyrrancy: '₽'
  },
  {
    color: '#5D4FFF',
    name: 'Интернет',
    icon: 'language',
    count: 345,
    cyrrancy: '₽'
  },
  {
    color: '#4FB5FF',
    name: 'Взятка',
    count: 4253,
    cyrrancy: '₽'
  },
  {
    color: '#FFC34F',
    name: 'Походы в туалет',
    count: 6253,
    cyrrancy: '₽'
  }
]
</script>

<template>
  <div class="transactions-visual-info">
    <div class="chose-month">
      <p class="chose-month__title title-medium on-surface-text">Расходы за</p>
      <md-text-button @click="ButtonAddCustomDateHandler">{{
        getStringChosedMonth
      }}</md-text-button>
    </div>
    <div class="graph-diogram-section">
      <md-icon-button class="button-swap-diagram" @click="clickButtonSwapHandler('left')">
        <ArrowLeftBig />
      </md-icon-button>
      <GraphDiogram :data="transactionsData" />
      <md-icon-button class="button-swap-diagram" @click="clickButtonSwapHandler('right')">
        <ArrowRightBig />
      </md-icon-button>
    </div>
    <ul class="categpries-list">
      <li v-for="(categpry, index) in categpries" :key="index">
        <CardCategory
          :count="categpry.count"
          :name="categpry.name"
          :color="categpry.color"
          :cyrrancy="categpry.cyrrancy"
          :icon="categpry.icon"
        />
      </li>
    </ul>
  </div>
  <DialogSetRangeDate
    headline="Выберите месяц"
    :isOpen="modalSetDateIsOpen"
    @submitDate="submitDateHandler"
    @closeModal="closeModalHandler"
  />
</template>

<style lang="scss">
.transactions-visual-info {
  display: flex;
  flex-direction: column;

  gap: 8px;
}

.chose-month {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
