<script setup lang="ts">
import { ref } from 'vue'

import InputColor from '@/components/radio/RadioColor/RadioColor.vue'
import ButtonRegenerateColors from './custom/ButtonRegenerateColors/ButtonRegenerateColors.vue'

import type { IColor } from '../types/index'
import { GeneratorColors } from '../helpers/generatorColors'

const colors = ref<IColor[]>([])
const chosedColor = ref<IColor>()

const colorManager = new GeneratorColors(colors, chosedColor, 9)

const emit = defineEmits(['update:checkedValue'])

colorManager.generateColors()
colorManager.setDefaultColor()
updateValueHandler()

const clickRegenerateButtonHandler = () => {
  updateValueHandler()
  colorManager.regenerateColors()
}

function updateValueHandler(): void {
  emit('update:checkedValue', chosedColor.value)
}
</script>

<template>
  <ul class="list-colors">
    <li v-for="color in colors" :key="color.id">
      <InputColor
        :id="color.id"
        :value="color.value"
        v-model:checkedValue="chosedColor"
        name="color"
        :checked="color.id === chosedColor?.id"
        @input="updateValueHandler"
      />
    </li>
    <li>
      <ButtonRegenerateColors @clickRegenerateButton="clickRegenerateButtonHandler" />
    </li>
  </ul>
</template>

<style lang="scss">
.list-colors {
  padding: 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
