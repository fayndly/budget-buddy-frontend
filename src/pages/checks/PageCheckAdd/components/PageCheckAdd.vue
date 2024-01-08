<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'

import TitleHeader from '@/components/titles/TitleHeader.vue'

import { FormCheckAdd, isLoading } from '@/modules/forms/check/FormCheckAdd'
</script>

<template>
  <BarTopApp title="Добавление счёта" :showProgress="isLoading" />
  <TemplateMain>
    <TemplateSection>
      <TitleHeader title="Счет" icon="add_card" />
    </TemplateSection>
    <TemplateSection>
      <FormCheckAdd />
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss"></style>
