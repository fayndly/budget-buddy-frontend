<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import SectionLoader from '@/components/sections/SectionLoader/SectionLoader.vue'
import SectionNotFound from '@/components/sections/SectionNotFound/SectionNotFound.vue'

import ListDataInfo from '@/components/wrappers/ListDataInfo/ListDataInfo.vue'

import type { ICheck, TMongoObjectId, TFormatListDataInfo } from '@/utils/types/data/data.types'

import { useChecksStore } from '@/stores/API/checks'
const { getCheckById } = useChecksStore()

const checkInfo = ref<TFormatListDataInfo | null>(null)
const check = ref<ICheck | null | undefined>(null)

const isDataLoading = ref<boolean>(false)

const getFormatArrayItems = (checkData: ICheck): TFormatListDataInfo => {
  return [
    {
      titleName: 'Имя',
      value: checkData.name
    },
    {
      titleName: 'Валюта',
      value: (typeof checkData.currency === 'object' && checkData.currency?.symbol) || null
    },
    {
      titleName: 'Сумма',
      value: checkData.amount.toLocaleString(
        (typeof checkData.currency === 'object' && checkData.currency?.designation) || undefined
      )
    },
    {
      titleName: 'Время создания',
      value: new Date(checkData.createdAt).toLocaleString()
    },
    {
      titleName: 'Время обновления',
      value: new Date(checkData.updatedAt).toLocaleString()
    }
  ]
}

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const isCheckNotFound = ref<boolean>(false)

onMounted(async () => {
  isDataLoading.value = true
  isCheckNotFound.value = false

  if (route.params.checkId) {
    check.value = await getCheckById(route.params.checkId as TMongoObjectId)
    if (check.value === undefined) isCheckNotFound.value = true
  } else {
    isCheckNotFound.value = true
  }

  if (check.value) checkInfo.value = getFormatArrayItems(check.value)

  isDataLoading.value = false
})
</script>

<template>
  <BarTopApp
    title="Счет"
    :showButtonEdit="!isCheckNotFound"
    @clickButtonEdit="router.push({ name: 'ChecksUpdate', params: { checkId: check?.id } })"
  />
  <TemplateMain>
    <SectionLoader v-if="isDataLoading" />
    <SectionNotFound
      header="Счет не найден"
      text="Возможно, он был удален и больше не доступен"
      v-if="isCheckNotFound"
    />
    <TemplateSection>
      <ListDataInfo :values="checkInfo" />
    </TemplateSection>
  </TemplateMain>
</template>
