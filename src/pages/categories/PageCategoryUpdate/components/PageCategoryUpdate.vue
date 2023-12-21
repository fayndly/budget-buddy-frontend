<script setup lang="ts">
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'
</script>

<template>
  <BarTopApp
    title="Редактировать категорию"
    :showButtonDelete="true"
    @clickButtonDelete="console.log('delete category')"
  />
  <TemplateMain>
    <TemplateSection>
      <h1>page edit category</h1>
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss"></style>
