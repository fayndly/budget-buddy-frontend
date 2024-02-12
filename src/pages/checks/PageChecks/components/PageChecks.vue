<script setup lang="ts">
import '@material/web/fab/fab'
import '@material/web/list/list'

import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'

import SectionLoader from '@/components/sections/SectionLoader/SectionLoader.vue'
import SectionEmpty from '@/components/sections/SectionEmpty/SectionEmpty.vue'

import ListItemCheck from '@/components/listItems/ListItemCheck/ListItemCheck.vue'

import { useChecksStore } from '@/stores/API/checks'
import { storeToRefs } from 'pinia'

const checksStore = useChecksStore()

const { checks, isLoading } = storeToRefs(checksStore)
</script>

<template>
  <BarTopApp title="Счета" />
  <TemplateMain class="main-checks">
    <SectionEmpty
      v-if="!isLoading && !checks.length"
      header="Нет счетов"
      text="Создайте счет кнопкой ниже"
      :routeTo="{ name: 'ChecksAdd' }"
    />
    <SectionLoader v-if="isLoading && !checks.length" />
    <TemplateSection>
      <md-list class="list-checks">
        <ListItemCheck v-for="check in checks" :key="check.id" :check="check" />
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
