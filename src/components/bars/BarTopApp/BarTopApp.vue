<script setup lang="ts">
import '@material/web/iconbutton/icon-button'
import 'material-icons/iconfont/material-icons.css'

defineProps(['title'])
</script>

<template>
  <div class="bar-top-app surface">
    <md-icon-button @click="$router.go(-1)">
      <span class="material-icons-outlined">arrow_back</span>
    </md-icon-button>
    <h2 class="title-large on-surface-text">{{ title }}</h2>
  </div>
</template>

<style lang="scss">
.bar-top-app {
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;

  padding: 4px;
  gap: 4px;
}
</style>
