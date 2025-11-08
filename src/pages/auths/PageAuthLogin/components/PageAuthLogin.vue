<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import { FormLogin } from '@/modules/forms/FormLogin'
import TabsAuth from '@/components/tabs/TabsAuth/TabsAuth.vue'
</script>

<template>
  <TemplateMain>
    <TemplateSection class="section-login">
      <h1 class="headline-medium secondary-text">Войти</h1>
      <FormLogin />
      <TabsAuth />
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss">
.section-login {
  height: 100%;
  justify-content: center;
  .section__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 24px;
  }
}
</style>
