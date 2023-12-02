<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'
import BarNavigate from '@/components/bars/BarNavigate/BarNavigate.vue'

import '@material/web/fab/fab'
</script>

<template>
  <TemplateMain class="main-main">
    <TemplateSection>
      <h1>Page main</h1>
    </TemplateSection>
    <TemplateSection>
      <router-view></router-view>
    </TemplateSection>
  </TemplateMain>
  <BarNavigate />
</template>

<style lang="scss">
.main-main {
  position: relative;
}
.fab-add-transaction {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>
