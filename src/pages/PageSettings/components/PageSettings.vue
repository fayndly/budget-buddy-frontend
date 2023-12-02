<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import BarNavigate from '@/components/bars/BarNavigate/BarNavigate.vue'

import '@material/web/dialog/dialog'
</script>

<template>
  <BarTopApp :showButtonBack="false" title="Настройки" />
  <TemplateMain>
    <TemplateSection class="TemplateSectionSettings">
      <h1>Page settings</h1>
    </TemplateSection>
  </TemplateMain>
  <BarNavigate />
</template>

<style lang="scss"></style>
