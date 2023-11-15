<script setup lang="ts">
import '@material/web/iconbutton/filled-tonal-icon-button'
defineEmits(['clickRegenerateButton'])
</script>

<template>
  <md-filled-tonal-icon-button type="button" @click="$emit('clickRegenerateButton')">
    <span class="material-icons-outlined">sync</span>
  </md-filled-tonal-icon-button>
</template>
