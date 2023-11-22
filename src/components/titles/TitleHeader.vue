<script setup lang="ts">
import 'material-icons/iconfont/material-icons.css'
defineProps(['title', 'icon', 'color'])
</script>

<template>
  <div class="title-header">
    <span
      class="title-header__icon material-icons-outlined outline-variant-text"
      :style="`color: ${color};`"
      >{{ icon }}</span
    >
    <h1
      class="title-header__text display-medium secondary-text outline-variant-text"
      :style="`color: ${color};`"
    >
      {{ title }}
    </h1>
  </div>
</template>

<style lang="scss">
.title-header {
  display: flex;
  align-items: center;
  gap: 16px;

  &__icon {
    font-size: 42px;

    // width: 42px;
    // height: 42px;
  }
}
</style>
