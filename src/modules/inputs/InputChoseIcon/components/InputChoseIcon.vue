<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import type { IIcon } from '@/utils/types/data/data.types'

import InputRadioIcon from '@/components/inputs/radio/InputRadioIcon/InputRadioIcon.vue'
import ButtonAddIcon from './custom/ButtonAddIcon/ButtonAddIcon.vue'
import DialogSetIcon from '@/components/dialogs/DialogSetIcon/DialogSetIcon.vue'

import { GeneratorIcons } from '../helpers/generatorIcons'

import type { IPropsInputChoseIcon } from '../types/props.types'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<IPropsInputChoseIcon>()

const icons = ref<IIcon[]>([])
const chosedIcon = ref<IIcon | null>(null)

const iconManager = new GeneratorIcons(icons, chosedIcon, 9)

const getDefaultIcon = computed(() => props.defaultValue)

const setDefaultIcon = () => {
  if (props.defaultValue) {
    iconManager.clearWrapperIcons()
    iconManager.addIcon(props.defaultValue, props.defaultValue)
    iconManager.generateIcons()
    iconManager.setDefaultIcon()

    updateValueHandler()
  }
}
setDefaultIcon()
watch(getDefaultIcon, () => {
  setDefaultIcon()
})

iconManager.generateIcons()
iconManager.setDefaultIcon()
updateValueHandler()

function updateValueHandler(): void {
  emit('update:modelValue', chosedIcon.value)
}

const clickButtonAddHandler = () => {
  modalSetIconIsOpen.value = true
}

const modalSetIconIsOpen = ref<boolean>(false)
const closeModalHandler = () => {
  modalSetIconIsOpen.value = false
}
const submitIconHandler = (icon: string) => {
  iconManager.addIcon(icon, icon)
}
</script>

<template>
  <ul class="list-icons">
    <li v-for="icon in icons" :key="icon.id">
      <InputRadioIcon
        name="icon"
        :id="icon.id"
        :value="icon.value"
        :iconName="icon.iconName"
        :hasText="icon.value === null"
        v-model:modelValue="chosedIcon"
        :checked="icon.id === chosedIcon?.id"
        @change="updateValueHandler"
      />
    </li>
    <li>
      <ButtonAddIcon @clickButton="clickButtonAddHandler" />
    </li>
  </ul>
  <DialogSetIcon
    headline="Выберите иконку"
    :isOpen="modalSetIconIsOpen"
    @submitColor="submitIconHandler"
    @closeModal="closeModalHandler"
  />
</template>

<style lang="scss" scoped>
.list-icons {
  padding: 0;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
