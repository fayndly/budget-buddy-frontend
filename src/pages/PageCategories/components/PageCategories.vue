<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import BarNavigate from '@/components/bars/BarNavigate/BarNavigate.vue'
import TabsTypeCategories from '@/components/tabs/TabsTypeCategories/TabsTypeCategories.vue'
</script>

<template>
  <BarTopApp title="Категории" />
  <TabsTypeCategories />
  <TemplateMain>
    <TemplateSection>
      <router-view></router-view>
    </TemplateSection>
  </TemplateMain>
  <BarNavigate />
</template>

<style lang="scss"></style>
