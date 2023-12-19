<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import '@material/web/button/filled-tonal-button'

const pages = [
  'AuthSignup',
  'AuthLogin',
  'Settings',
  'TransactionsAdd',
  'ChecksAdd',
  'CategoriesAdd',
  'Main'
]
</script>

<template>
  <TemplateMain>
    <TemplateSection class="section-signup">
      <h1 class="headline-medium secondary-text">Page home</h1>
      <md-filled-tonal-button
        v-for="page in pages"
        :key="page"
        @click="$router.push({ name: page })"
        >{{ page }}</md-filled-tonal-button
      >
    </TemplateSection></TemplateMain
  >
</template>

<style lang="scss">
.section-main {
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
