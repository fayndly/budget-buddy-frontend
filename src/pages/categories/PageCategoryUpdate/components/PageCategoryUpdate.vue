<script setup lang="ts">
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'
import TitleHeader from '@/components/titles/TitleHeader.vue'

import { FormCategoryUpdate } from '@/modules/forms/FormCategoryUpdate'
</script>

<template>
  <BarTopApp
    title="Редактировать категорию"
    :showButtonDelete="true"
    @clickButtonDelete="console.log('delete category')"
  />
  <TemplateMain>
    <TemplateSection>
      <TitleHeader title="Категория" icon="edit" />
    </TemplateSection>
    <TemplateSection>
      <FormCategoryUpdate />
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss"></style>
