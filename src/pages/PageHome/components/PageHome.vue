<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import '@material/web/button/filled-tonal-button'
</script>

<template>
  <TemplateMain>
    <TemplateSection class="section-signup">
      <h1 class="headline-medium secondary-text">Page home</h1>
      <router-link :to="{ name: 'Signup' }">
        <md-filled-tonal-button>Signup</md-filled-tonal-button>
      </router-link>
      <router-link :to="{ name: 'Login' }">
        <md-filled-tonal-button>Login</md-filled-tonal-button>
      </router-link>
      <router-link :to="{ name: 'Settings' }">
        <md-filled-tonal-button>Settings</md-filled-tonal-button>
      </router-link>
      <router-link :to="{ name: 'AddExpense' }">
        <md-filled-tonal-button>AddExpense</md-filled-tonal-button>
      </router-link>
      <router-link :to="{ name: 'AddIncome' }">
        <md-filled-tonal-button>AddExpense</md-filled-tonal-button>
      </router-link>
      <router-link :to="{ name: 'AddCheck' }">
        <md-filled-tonal-button>AddCheck</md-filled-tonal-button>
      </router-link>
      <router-link :to="{ name: 'AddCategory' }">
        <md-filled-tonal-button>AddCategory</md-filled-tonal-button>
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
