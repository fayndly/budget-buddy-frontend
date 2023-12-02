<script setup lang="ts">
import { ref, watch, onUpdated } from 'vue'

import '@material/web/select/outlined-select'
import '@material/web/select/select-option'

import { attributesInputSelectCheck } from './constants/attributes'
import type { IPropsInputSelectCheck } from './types/props'

const props = defineProps<IPropsInputSelectCheck>()

const checkField = ref()

const emit = defineEmits(['update:selectedValue'])
watch(checkField, () => {
  emit('update:selectedValue', checkField.value)
})
checkField.value = props.selectedValue
onUpdated(() => {
  checkField.value = props.selectedValue
})
</script>

<template>
  <md-outlined-select v-bind="attributesInputSelectCheck" v-model="checkField">
    <md-select-option
      v-for="check in checks"
      :key="check.id"
      :selected="checkField === check.id"
      :value="check.id"
    >
      <div slot="headline">{{ check.name }}</div>
    </md-select-option>
  </md-outlined-select>
</template>
