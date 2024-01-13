<script setup lang="ts">
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'
import TitleHeader from '@/components/titles/TitleHeader.vue'

import { FormTransactionUpdate } from '@/modules/forms/transaction/FormTransactionUpdate'
</script>

<template>
  <BarTopApp
    title="Редактировать транзакцию"
    :showButtonDelete="true"
    @clickButtonDelete="console.log('delete transaction')"
  />
  <TemplateMain>
    <TemplateSection>
      <TitleHeader title="Транзакция" icon="edit" />
    </TemplateSection>
    <TemplateSection>
      <FormTransactionUpdate />
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss"></style>
