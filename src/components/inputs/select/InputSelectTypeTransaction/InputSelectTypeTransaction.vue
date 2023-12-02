<script setup lang="ts">
import { ref, watch, onUpdated } from 'vue'

import '@material/web/select/outlined-select'
import '@material/web/select/select-option'

import { attributesInputSelectTypeTransaction } from './constants/attributes'
import type { IPropsInputSelectTypeTransaction } from './constants/props'

import type { ITypeTransaction } from '@/utils/types/types'

const props = defineProps<IPropsInputSelectTypeTransaction>()

const typesTransaction = [
  { name: 'Расход', id: 'expense' },
  { name: 'Доход', id: 'income' }
]

const typeField = ref<ITypeTransaction | null>(null)

const emit = defineEmits(['update:selectedValue'])
watch(typeField, () => {
  emit('update:selectedValue', typeField.value)
})
typeField.value = props.selectedValue
onUpdated(() => {
  typeField.value = props.selectedValue
})
</script>

<template>
  <md-outlined-select v-bind="attributesInputSelectTypeTransaction" v-model="typeField">
    <md-select-option
      v-for="type in typesTransaction"
      :key="type.id"
      :selected="typeField === type.id"
      :value="type.id"
    >
      <div slot="headline">{{ type.name }}</div>
    </md-select-option>
  </md-outlined-select>
</template>
