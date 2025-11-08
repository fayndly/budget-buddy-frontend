<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'

import '@material/web/list/list'
import '@material/web/list/list-item'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useUserAuthStore } from '@/stores/UserAuthStore'
const userAuthStore = useUserAuthStore()

const clickLogout = () => {
  router.push({ name: 'AuthLogin' })
  userAuthStore.setUserAuth(false)
}
</script>

<template>
  <BarTopApp :showButtonBack="false" title="Настройки" />
  <TemplateMain class="main-settings">
    <TemplateSection class="TemplateSectionSettings">
      <md-list>
        <md-list-item interactive type="button" @click="$router.push({ name: 'Checks' })">
          Счета
          <span slot="start" class="material-icons-outlined">account_balance</span>
          <span class="material-icons-outlined" slot="end"> chevron_right </span>
        </md-list-item>
        <md-list-item interactive type="button" @click="$router.push({ name: 'Categories' })">
          Категории
          <span slot="start" class="material-icons-outlined">category</span>
          <span class="material-icons-outlined" slot="end"> chevron_right </span>
        </md-list-item>
        <md-divider></md-divider>
        <md-list-item interactive type="button" @click="clickLogout">
          Выход
          <span slot="start" class="material-icons-outlined"> logout </span>
        </md-list-item>
      </md-list>
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss">
.main-settings {
  padding: 0px;
}
</style>
