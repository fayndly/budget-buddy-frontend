<script setup lang="ts">
import '@material/web/button/filled-tonal-button'

import type { IPropsSectionEmpty } from './types/props.types'

defineProps<IPropsSectionEmpty>()
</script>

<template>
  <section class="section-empty">
    <div class="section-empty__title">
      <h2 class="section-empty__header headline-medium on-background-text">{{ header }}</h2>
      <p class="section-empty__text body-medium outline-text">
        {{ text }}
      </p>
    </div>
    <md-filled-tonal-button class="section-empty__button" @click="$router.push(routeTo)">
      Создать
      <span class="material-icons-outlined section-empty__button-icon" slot="icon">add</span>
    </md-filled-tonal-button>
  </section>
</template>

<style lang="scss" scoped>
.section-empty {
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
  &__button {
  }
  &__button-icon {
    height: 24px;
    width: 24px;
  }
}
</style>
