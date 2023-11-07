<script setup lang="ts">
import '@material/web/iconbutton/icon-button'
import 'material-icons/iconfont/material-icons.css'

defineProps({
  title: String,
  showButtonBack: {
    default: true
  }
})
</script>

<template>
  <div class="bar-top-app surface" :class="{ 'bar-top-app--hide-back': !showButtonBack }">
    <md-icon-button v-if="showButtonBack" @click="$router.go(-1)">
      <span class="material-icons-outlined">arrow_back</span>
    </md-icon-button>
    <h2 class="title-large on-surface-text">{{ title }}</h2>
  </div>
</template>

<style lang="scss">
.bar-top-app {
  width: 100%;
  min-height: 64px;

  display: flex;
  align-items: center;

  padding: 4px;
  padding-right: 16px;
  gap: 4px;

  &--hide-back {
    padding-left: 16px;
  }
}
</style>
