<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import BarNavigate from '@/components/bars/BarNavigate/BarNavigate.vue'
</script>

<template>
  <BarTopApp title="Добавление дохода" />
  <TemplateMain>
    <TemplateSection>
      <h1>Page add income</h1>
    </TemplateSection>
  </TemplateMain>
  <BarNavigate />
</template>

<style lang="scss"></style>
