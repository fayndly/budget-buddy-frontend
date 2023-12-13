<script setup lang="ts">
import { ref, onMounted } from 'vue'

import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'
import BarNavigate from '@/components/bars/BarNavigate/BarNavigate.vue'

import BarCheck from '@/components/bars/BarCheck/BarCheck.vue'
import TabsTypeTransactions from '@/components/tabs/TabsTypeTransactions/TabsTypeTransactions.vue'

import type { ICheck } from '@/utils/types/interfaces'

import '@material/web/fab/fab'

const getChecks = async (): Promise<ICheck[]> => {
  return [
    {
      name: 'Сбер',
      id: 'check1'
    },
    {
      name: 'Тинькофф',
      id: 'check2'
    }
  ]
}

const checks = ref<ICheck[]>([])
const chosedCheck = ref<ICheck | null>(null)

onMounted(async () => {
  checks.value.push(...(await getChecks()))

  chosedCheck.value = checks.value[1]
})
</script>

<template>
  <BarCheck :checks="checks" :chosedCheck="chosedCheck" />
  <TabsTypeTransactions />
  <TemplateMain class="main-main">
    <TemplateSection class="main-template-section">
      <router-view></router-view>
    </TemplateSection>
  </TemplateMain>
  <BarNavigate />
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
