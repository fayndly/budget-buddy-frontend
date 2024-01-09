<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'

import TitleHeader from '@/components/titles/TitleHeader.vue'

import { FormCategoryAdd, isLoading } from '@/modules/forms/category/FormCategoryAdd'
</script>

<template>
  <BarTopApp title="Добавление категории" :showProgress="isLoading" />
  <TemplateMain>
    <TemplateSection>
      <TitleHeader title="Категория" icon="category" />
    </TemplateSection>
    <TemplateSection>
      <FormCategoryAdd />
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss"></style>
