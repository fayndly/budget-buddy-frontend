<script setup lang="ts">
import { ref } from 'vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import BarNavigate from '@/components/bars/BarNavigate/BarNavigate.vue'

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
  <TemplateMain>
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
          <span class="material-icons-outlined" slot="end"> chevron_right </span>
        </md-list-item>
        <md-divider></md-divider>
        <md-list-item type="button" class="list-checks__item-add">
          <div slot="headline" class="list-checks__item-add-wrapper">
            <span class="material-icons-outlined"> add </span>
          </div>
        </md-list-item>
      </md-list>
    </TemplateSection>
  </TemplateMain>
  <BarNavigate />
</template>

<style lang="scss">
.list-checks {
  &__item {
  }
  &__item-add {
  }
  &__item-add-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
