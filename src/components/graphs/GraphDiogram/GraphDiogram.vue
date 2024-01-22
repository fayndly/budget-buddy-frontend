<script setup lang="ts">
import { watch, ref } from 'vue'
import type { IPropsGrathDiagram } from './types/props'

import type { IFormatData } from './types/props'

const props = defineProps<IPropsGrathDiagram>()

import { DiagramDataCalculator } from './helpers/DiagramDataCalculator'

const transactionsData = ref<IFormatData[]>([])

transactionsData.value = props.data

const diagramDataCalculatorManager = new DiagramDataCalculator(transactionsData)
diagramDataCalculatorManager.generateDasharray()
diagramDataCalculatorManager.generateDashoffset()

watch(props, () => {
  transactionsData.value = props.data

  diagramDataCalculatorManager.generateDasharray()
  diagramDataCalculatorManager.generateDashoffset()
})
</script>

<template>
  <div class="canvas">
    <p
      class="headline headline-small"
      :style="{ color: typeTransactions === 'expense' ? '#ff7676' : '#76ff94' }"
    >
      {{ typeTransactions === 'expense' ? '-' : '+' }}
      {{ diagramDataCalculatorManager.sumTransactions.toLocaleString('ru-RU') }}₽
    </p>
    <svg class="chart" viewBox="0 0 37 37">
      <circle
        v-for="transaction in transactionsData"
        :key="transaction.category?.id"
        class="unit"
        r="15.9"
        cx="50%"
        cy="50%"
        :style="`stroke: ${transaction.category?.color}; stroke-dasharray: ${transaction.strokeDasharray} 100; stroke-dashoffset: -${transaction.strokeDashoffset};`"
      ></circle>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
@keyframes render {
  0% {
    stroke-dasharray: 0 100;
  }
}

.canvas {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
}

.chart {
  max-width: 180px;
}

.headline {
  position: absolute;
  font-size: 20px;
}

.unit {
  fill: none;
  stroke-width: 5px;

  animation-name: render;
  animation-duration: 0.3s;
  transition-property: all;
  transition-duration: 0.3s;
}
</style>
