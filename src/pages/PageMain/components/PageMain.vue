<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import { BarCheck } from '@/modules/BarCheck'
import TabsTypeTransactions from '@/components/tabs/TabsTypeTransactions/TabsTypeTransactions.vue'
</script>

<template>
  <BarCheck />
  <TabsTypeTransactions />
  <TemplateMain class="main-main">
    <TemplateSection class="main-template-section">
      <router-view></router-view>
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss">
.main-main {
  position: relative;
  height: 100px;
}

.main-template-section {
  .section__content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
