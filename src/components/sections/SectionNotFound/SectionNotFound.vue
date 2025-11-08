<script setup lang="ts">
import '@material/web/button/filled-tonal-button'

import type { IPropsSectionNotFound } from './types/props.types'

defineProps<IPropsSectionNotFound>()
</script>

<template>
  <section class="section-not-found">
    <div class="section-not-found__title">
      <h2 class="section-not-found__header headline-medium on-background-text">{{ header }}</h2>
      <p class="section-not-found__text body-medium outline-text">
        {{ text }}
      </p>
    </div>
    <md-filled-tonal-button @click="$router.go(-1)"> Вернуться назад </md-filled-tonal-button>
  </section>
</template>

<style lang="scss">
.section-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 32px;
  &__title {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 8px;
  }
  &__header {
  }
  &__text {
  }
}
</style>
