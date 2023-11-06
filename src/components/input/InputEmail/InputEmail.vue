<script setup lang="ts">
import '@material/web/textfield/outlined-text-field'

import { propsInputEmail } from './constants/PropsInput'

defineProps(['value'])
defineEmits(['update:value'])
</script>

<template>
  <md-outlined-text-field
    v-bind="propsInputEmail"
    :value="value"
    @input="$emit('update:value', $event.target.value)"
  />
</template>
