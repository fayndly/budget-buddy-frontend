<script setup lang="ts">
import { ref } from 'vue'

import type { IIcon } from '../types/index'

import RadioIcon from '@/components/radio/RadioIcon/RadioIcon.vue'

const emit = defineEmits(['update:checkedValue'])

function updateValueHandler(): void {
  emit('update:checkedValue', chosedIcon.value)
}

const mocksIcons: IIcon[] = [
  {
    iconName: 'нет',
    id: 'icon0',
    value: null
  },
  {
    iconName: 'home',
    id: 'icon1',
    value: 'home'
  },
  {
    iconName: 'apartment',
    id: 'icon2',
    value: 'apartment'
  },
  {
    iconName: 'shopping_bag',
    id: 'icon3',
    value: 'shopping_bag'
  },
  {
    iconName: 'directions_car',
    id: 'icon4',
    value: 'directions_car'
  },
  {
    iconName: 'construction',
    id: 'icon5',
    value: 'construction'
  },
  {
    iconName: 'train',
    id: 'icon6',
    value: 'train'
  },
  {
    iconName: 'local_taxi',
    id: 'icon7',
    value: 'local_taxi'
  },
  {
    iconName: 'storefront',
    id: 'icon8',
    value: 'storefront'
  },
  {
    iconName: 'phone_iphone',
    id: 'icon9',
    value: 'phone_iphone'
  }
]

const icons = ref<IIcon[]>([])
const chosedIcon = ref<IIcon | null>()

chosedIcon.value = mocksIcons[0]
updateValueHandler()

icons.value.push(...mocksIcons)
</script>

<template>
  <ul class="list-icons">
    <li v-for="icon in icons" :key="icon.id">
      <RadioIcon
        :id="icon.id"
        :value="icon.value"
        :iconName="icon.iconName"
        :hasText="false || icon.id === 'icon0'"
        name="icon"
        v-model:checked-value="chosedIcon"
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
