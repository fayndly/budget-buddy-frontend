<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import '@material/web/button/filled-tonal-button'

const pages = ['Signup', 'Login', 'Settings', 'AddTransaction', 'AddCheck', 'AddCategory']
</script>

<template>
  <TemplateMain>
    <TemplateSection class="section-signup">
      <h1 class="headline-medium secondary-text">Page home</h1>
      <router-link v-for="page in pages" :key="page" :to="{ name: page }">
        <md-filled-tonal-button>{{ page }}</md-filled-tonal-button>
      </router-link>
      <router-link to="/notFound">
        <md-filled-tonal-button>NotFound</md-filled-tonal-button>
      </router-link>
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
