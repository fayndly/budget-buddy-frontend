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
    <md-fab
      class="fab-add-categories"
      variant="secondary"
      @click="
        $router.push({
          name: 'CategoriesAdd',
          query: {
            type: 'income'
          }
        })
      "
      ><span slot="icon" class="material-icons-outlined">add</span></md-fab
    >
  </TemplateMain>
</template>

<style lang="scss" scoped>
.main-categories {
  padding: 0px;
}
.fab-add-categories {
  position: absolute;
  bottom: calc(16px + 80px);
  right: 16px;
}
</style>
