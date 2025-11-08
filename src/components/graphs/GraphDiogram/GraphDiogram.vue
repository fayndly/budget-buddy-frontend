<script setup lang="ts">
import { watch, ref, computed, reactive } from 'vue'
import type { IPropsGrathDiagram } from './types/props'

const props = defineProps<IPropsGrathDiagram>()

import type { IFormatTransactionsVisualInfo } from '@/utils/types/data/data.types'

import { getReadableAmount } from '@/utils/helpers/getReadableAmount'

const transactionsData = ref<IFormatTransactionsVisualInfo[]>([])

transactionsData.value = props.data

watch(props, () => {
  transactionsData.value = props.data
})

import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement } from 'chart.js'

const getArrDataColorsAndCounts = (transactionsData: IFormatTransactionsVisualInfo[]) => {
  return transactionsData.reduce<{
    data: number[]
    backgroundColor: string[]
  }>(
    (acc, val) => {
      acc.data.push(val.amount)
      acc.backgroundColor.push(val.category?.color || 'transparent')
      return acc
    },
    {
      data: [],
      backgroundColor: []
    }
  )
}

const getBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue(
  '--md-sys-color-background'
)

const getSumAmounts = computed(() => {
  return transactionsData.value.reduce((cal, val) => {
    cal += val.amount
    return cal
  }, 0)
})

const getData = computed(() => {
  const { data, backgroundColor } = getArrDataColorsAndCounts(transactionsData.value)

  const chartData = {
    cutout: '70%',
    borderRadius: 8,

    borderWidth: 2,
    borderColor: getBackgroundColor,
    data: [] as number[],
    backgroundColor: [] as string[]
  }

  if (data.length) {
    const hasAboveZero = data.reduce((prev, curr) => {
      if (curr > 0) {
        prev = true
      }
      return prev
    }, false)

    if (!hasAboveZero) {
      chartData.data = data.map<number>((val) => {
        return val + 1
      })
    } else {
      chartData.data = data
    }

    chartData.backgroundColor = backgroundColor
  } else {
    chartData.data = Array.from({ length: 4 }, () => 1)
    chartData.backgroundColor = Array.from({ length: 4 }, () => '#00000030')
  }

  return {
    datasets: [chartData]
  }
})

ChartJS.register(ArcElement)

const options = {
  type: 'doughnut',
  responsive: true,
  events: []
}

const amountStyle = reactive({
  color: 'none'
})

const setAmountColor = (color?: string | undefined) => {
  amountStyle.color = color || 'var(--md-sys-color-outline)'
}

const getStringReadableAmount = computed<string>(() => {
  if (transactionsData.value.length) {
    setAmountColor(props.typeTransactions === 'expense' ? '#ff7676' : '#76ff94')
    return `${props.typeTransactions === 'expense' ? '-' : '+'}
          ${getReadableAmount(getSumAmounts.value, props.currencyCheck)}`
  } else {
    setAmountColor()
    return 'Нет данных'
  }
})
</script>

<template>
  <div class="graph-diogram">
    <div class="graph-diogram__chart">
      <Doughnut class="graph-diogram__canvas" :data="getData" :options="options"
        >Ваш браузер не поддерживает этот график</Doughnut
      >
    </div>
    <p class="graph-diogram__amount headline headline-small" :style="amountStyle">
      {{ getStringReadableAmount }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.graph-diogram {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;

  &__chart {
    max-width: 220px;
  }

  &__amount {
    position: absolute;
    font-size: 20px;

    transition: all 0.3s ease-in-out;
    opacity: 1;
  }
}
</style>
