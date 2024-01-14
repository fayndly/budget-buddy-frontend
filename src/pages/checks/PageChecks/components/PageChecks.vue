<script setup lang="ts">
import { onMounted } from 'vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'

import CheckListItem from './custom/CheckListItem/CheckListItem.vue'

import { useGetChecks, checks } from '../services/useGetChecks'

import '@material/web/fab/fab'

import '@material/web/list/list'

onMounted(async () => {
  await useGetChecks()
})
</script>

<template>
  <BarTopApp title="Счета" />
  <TemplateMain class="main-checks">
    <TemplateSection>
      <md-list class="list-checks">
        <CheckListItem v-for="check in checks" :key="check.id" :check="check" />
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
