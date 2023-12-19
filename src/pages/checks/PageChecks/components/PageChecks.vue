<script setup lang="ts">
import { ref } from 'vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'

import '@material/web/fab/fab'

import '@material/web/list/list'
import '@material/web/list/list-item'

const checks = ref([
  {
    name: 'Сбер',
    count: 12645,
    currancy: '₽',
    id: '123'
  },
  {
    name: 'Тинькофф',
    count: 9530,
    currancy: '₽',
    id: '234'
  }
])
</script>

<template>
  <BarTopApp title="Счета" />
  <TemplateMain class="main-checks">
    <TemplateSection>
      <md-list class="list-checks">
        <md-list-item
          type="button"
          v-for="check in checks"
          :key="check.id"
          class="list-checks__item"
        >
          <div slot="headline">{{ check.name }}</div>
          <div slot="supporting-text">
            {{ check.count.toLocaleString('ru-RU') }}{{ check.currancy }}
          </div>
          <span class="material-icons-outlined" slot="end"> edit </span>
        </md-list-item>
      </md-list>
    </TemplateSection>
    <md-fab class="fab-add-check" variant="secondary" @click="$router.push({ name: 'ChecksAdd' })"
      ><span slot="icon" class="material-icons-outlined">add</span></md-fab
    >
  </TemplateMain>
</template>

<style lang="scss">
.main-checks {
  padding: 0px;
}
.fab-add-check {
  position: absolute;
  bottom: calc(16px + 80px);
  right: 16px;
}
</style>
