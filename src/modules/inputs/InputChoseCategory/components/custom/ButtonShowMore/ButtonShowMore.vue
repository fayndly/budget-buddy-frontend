<script setup lang="ts">
import '@material/web/iconbutton/filled-tonal-icon-button'
</script>

<template>
  <md-filled-tonal-icon-button type="button" toggle>
    <span class="material-icons-outlined">unfold_more</span>
    <span slot="selected" class="material-icons-outlined">unfold_less</span>
  </md-filled-tonal-icon-button>
</template>
