<script setup lang="ts">
import type { IPropsGrathDiagram } from './types/props'

const props = defineProps<IPropsGrathDiagram>()

import { DiagramDataCalculator } from './helpers/DiagramDataCalculator'

const diagramDataCalculatorManager = new DiagramDataCalculator(props.data)
diagramDataCalculatorManager.generateDasharray()
diagramDataCalculatorManager.generateDashoffset()
</script>

<template>
  <div class="canvas">
    <p class="headline headline-small">- {{ diagramDataCalculatorManager.sumTransactions }}₽</p>
    <svg class="chart" viewBox="0 0 37 37">
      <circle
        v-for="transaction in data"
        :key="transaction.color"
        class="unit"
        r="15.9"
        cx="50%"
        cy="50%"
        :style="`stroke: ${transaction.color}; stroke-dasharray: ${transaction.strokeDasharray} 100; stroke-dashoffset: -${transaction.strokeDashoffset};`"
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
  color: #ff7676;
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
