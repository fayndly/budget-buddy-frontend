<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import '@material/web/button/filled-tonal-button'
</script>

<template>
  <TemplateMain>
    <TemplateSection class="section-not-found">
      <h1 class="headline-medium secondary-text">Страница не найдена</h1>
      <router-link :to="{ name: 'Home' }">
        <md-filled-tonal-button> Вернуться к главной </md-filled-tonal-button>
      </router-link>
    </TemplateSection></TemplateMain
  >
</template>

<style lang="scss">
.section-not-found {
  height: 100%;
  justify-content: center;
  .section__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 24px;
  }
}
</style>
