<script lang="ts">
import { defineProps } from 'vue'
import '@material/web/textfield/outlined-text-field'

const props = defineProps({
  type: String,
  label: String,
  value: String,
  placeholder: String
})
</script>

<template>
  <md-outlined-text-field label="Label" value="Value"></md-outlined-text-field>
</template>

<style lang="scss"></style>
