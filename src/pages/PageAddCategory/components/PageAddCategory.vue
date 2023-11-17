<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import BarNavigate from '@/components/bars/BarNavigate/BarNavigate.vue'

import TitleHeader from '@/components/titles/TitleHeader.vue'

import { FormAddCategory } from '@/modules/forms/FormAddCategory'
</script>

<template>
  <BarTopApp title="Добавление категории" />
  <TemplateMain>
    <TemplateSection>
      <TitleHeader title="Категория" icon="category" />
    </TemplateSection>
    <TemplateSection>
      <FormAddCategory />
    </TemplateSection>
  </TemplateMain>
  <BarNavigate />
</template>

<style lang="scss"></style>
