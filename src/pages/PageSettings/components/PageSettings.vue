<script setup lang="ts">
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import BarNavigate from '@/components/bars/BarNavigate/BarNavigate.vue'

import '@material/web/dialog/dialog'
</script>

<template>
  <BarTopApp :showButtonBack="false" title="Настройки" />
  <TemplateMain>
    <TemplateSection class="TemplateSectionSettings">
      <h1>Page settings</h1>
      <Teleport to="body">
        <md-dialog open class="TemplateSectionSettings__dialog">
          <div slot="headline">Title</div>
          <div slot="content">Dialog content</div>
        </md-dialog>
      </Teleport>
    </TemplateSection>
  </TemplateMain>
  <BarNavigate />
</template>

<style lang="scss">
md-dialog {
  margin-top: calc(50svh - 20%);
  margin-left: calc(50vw - 35%);

  dialog {
    padding: 20px;
  }
  &:host {
  }
}
</style>
