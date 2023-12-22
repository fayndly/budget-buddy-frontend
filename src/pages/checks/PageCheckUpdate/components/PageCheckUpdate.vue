<script setup lang="ts">
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'
import TitleHeader from '@/components/titles/TitleHeader.vue'
import { FormCheckUpdate } from '@/modules/forms/FormCheckUpdate'
</script>

<template>
  <BarTopApp
    title="Редактировать счет"
    :showButtonDelete="true"
    @clickButtonDelete="console.log('delete check')"
  />
  <TemplateMain>
    <TemplateSection>
      <TitleHeader title="Счет" icon="edit" />
    </TemplateSection>
    <TemplateSection>
      <FormCheckUpdate />
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss"></style>
