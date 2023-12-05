<script setup lang="ts">
import { ref, onMounted } from 'vue'

import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'
import BarNavigate from '@/components/bars/BarNavigate/BarNavigate.vue'

import BarCheck from '@/components/bars/BarCheck/BarCheck.vue'

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

import { useRoute } from 'vue-router'
const route = useRoute()

onMounted(async () => {
  checks.value.push(...(await getChecks()))

  chosedCheck.value = checks.value[1]

  console.log(route.params.checkId)
})
</script>

<template>
  <BarCheck :checks="checks" :chosedCheck="chosedCheck" />
  <TemplateMain class="main-main">
    <TemplateSection>
      <router-view></router-view>
    </TemplateSection>
  </TemplateMain>
  <BarNavigate />
</template>

<style lang="scss">
.main-main {
  position: relative;
}
</style>
