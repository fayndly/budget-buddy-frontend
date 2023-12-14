<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import BarNavigate from '@/components/bars/BarNavigate/BarNavigate.vue'

import '@material/web/list/list'
import '@material/web/list/list-item'
</script>

<template>
  <BarTopApp :showButtonBack="false" title="Настройки" />
  <TemplateMain>
    <TemplateSection class="TemplateSectionSettings">
      <md-list>
        <md-list-item interactive type="button" @click="$router.push({ name: 'Checks' })">
          Счета
          <span slot="start" class="material-icons-outlined">account_balance</span>
        </md-list-item>
        <md-list-item interactive type="button" @click="$router.push({ name: 'Categories' })">
          Категории
          <span slot="start" class="material-icons-outlined">category</span>
        </md-list-item>
        <md-divider></md-divider>
        <md-list-item interactive type="button" @click="$router.push({ name: 'Login' })">
          Выход
          <span slot="start" class="material-icons-outlined"> logout </span>
        </md-list-item>
      </md-list>
    </TemplateSection>
  </TemplateMain>
  <BarNavigate />
</template>

<style lang="scss"></style>
