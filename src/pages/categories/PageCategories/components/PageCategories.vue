<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TabsTypeCategories from '@/components/tabs/TabsTypeCategories/TabsTypeCategories.vue'
</script>

<template>
  <BarTopApp title="Категории" />
  <TabsTypeCategories />
  <TemplateMain class="main-categories">
    <TemplateSection>
      <router-view></router-view>
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss" scoped>
.main-categories {
  padding: 0px;
  height: 100px;
}
</style>
