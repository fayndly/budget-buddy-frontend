<script setup lang="ts">
import { ref, watch, computed } from 'vue'

import InputRadioColor from '@/components/inputs/radio/InputRadioColor/InputRadioColor.vue'
import ButtonRegenerateColors from './custom/ButtonRegenerateColors/ButtonRegenerateColors.vue'
import ButtonAddColor from './custom/ButtonAddColor/ButtonAddColor.vue'
import DialogSetColor from '@/components/dialogs/DialogSetColor/DialogSetColor.vue'

import type { IColor } from '../types/index'
import type { IPropsInputChoseColor } from '../types/props.types'
import { GeneratorColors } from '../helpers/generatorColors'

const props = defineProps<IPropsInputChoseColor>()
const emit = defineEmits(['update:modelValue'])

const colors = ref<IColor[]>([])
const chosedColor = ref<IColor>()

const updateValueHandler = (): void => {
  emit('update:modelValue', chosedColor.value)
}

const getDefaultColor = computed(() => props.defaultColor)

watch(getDefaultColor, () => {
  if (props.defaultColor) {
    colorManager.clearWrapperColors()
    colorManager.addColor(props.defaultColor)
    colorManager.generateColors()
    colorManager.setDefaultColor()

    updateValueHandler()
  }
})

const colorManager = new GeneratorColors(colors, chosedColor, 9)

colorManager.generateColors()
colorManager.setDefaultColor()
updateValueHandler()

const clickRegenerateButtonHandler = () => {
  colorManager.regenerateColors()
  colorManager.setDefaultColor()
  updateValueHandler()
}

const clickButtonAddHandler = () => {
  modalSetColorIsOpen.value = true
}

const modalSetColorIsOpen = ref<boolean>(false)
const closeModalHandler = () => {
  modalSetColorIsOpen.value = false
}
const submitColorHandler = (color: string) => {
  colorManager.addColor(color)
}
</script>

<template>
  <ul class="list-colors">
    <li v-for="color in colors" :key="color.id">
      <InputRadioColor
        name="color"
        :id="color.id"
        :value="color.value"
        v-model:modelValue="chosedColor"
        :checked="color.id === chosedColor?.id"
        @input="updateValueHandler"
      />
    </li>
    <li>
      <ButtonRegenerateColors @clickButton="clickRegenerateButtonHandler" />
    </li>
    <li>
      <ButtonAddColor @clickButton="clickButtonAddHandler" />
    </li>
  </ul>
  <DialogSetColor
    headline="Выберите цвет"
    :isOpen="modalSetColorIsOpen"
    @submitColor="submitColorHandler"
    @closeModal="closeModalHandler"
  />
</template>

<style lang="scss">
.list-colors {
  padding: 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
