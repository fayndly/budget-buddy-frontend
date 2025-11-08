<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import { FormSignup } from '@/modules/forms/FormSignup'
import TabsAuth from '@/components/tabs/TabsAuth/TabsAuth.vue'
</script>

<template>
  <TemplateMain>
    <TemplateSection class="section-signup">
      <h1 class="headline-medium secondary-text">Зарегистрироваться</h1>
      <FormSignup />
      <TabsAuth />
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss">
.section-signup {
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
