<script setup lang="ts">
import '@material/web/iconbutton/filled-tonal-icon-button'

defineEmits(['clickButton'])
</script>

<template>
  <md-filled-tonal-icon-button class="button-set-date" type="button" @click="$emit('clickButton')">
    <span class="material-icons-outlined">add</span>
  </md-filled-tonal-icon-button>
</template>

<style lang="scss" scoped></style>
