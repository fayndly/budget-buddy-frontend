<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import type { IIcon } from '../types/index'

import InputRadioIcon from '@/components/inputs/radio/InputRadioIcon/InputRadioIcon.vue'

import { GeneratorIcons } from '../helpers/generatorIcons'

const emit = defineEmits(['update:modelValue'])
const props = defineProps(['defaultIcon'])

const icons = ref<IIcon[]>([])
const chosedIcon = ref<IIcon | null>(null)

const iconManager = new GeneratorIcons(icons, chosedIcon, 9)

const getDefaultIcon = computed(() => props.defaultIcon)

watch(getDefaultIcon, () => {
  if (props.defaultIcon) {
    iconManager.clearWrapperIcons()
    iconManager.addIcon(props.defaultIcon, props.defaultIcon)
    iconManager.generateIcons()
    iconManager.setDefaultIcon()

    updateValueHandler()
  }
})

iconManager.generateIcons()
iconManager.setDefaultIcon()
updateValueHandler()

function updateValueHandler(): void {
  emit('update:modelValue', chosedIcon.value)
}
</script>

<template>
  <ul class="list-icons">
    <li v-for="icon in icons" :key="icon.id">
      <InputRadioIcon
        :id="icon.id"
        :value="icon.value"
        :iconName="icon.iconName"
        :hasText="false || icon.id === 'icon_1'"
        name="icon"
        v-model:modelValue="chosedIcon"
        :checked="icon.id === chosedIcon?.id"
        @input="updateValueHandler"
      />
    </li>
  </ul>
</template>

<style lang="scss">
.list-icons {
  padding: 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
