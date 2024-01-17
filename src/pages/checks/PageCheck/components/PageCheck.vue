<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import SectionLoader from '@/components/sections/SectionLoader/SectionLoader.vue'
import SectionNotFound from '@/components/sections/SectionNotFound/SectionNotFound.vue'

import ListDataInfo from '@/components/wrappers/ListDataInfo/ListDataInfo.vue'

import type { ICheck, TTypeTransaction, TFormatListDataInfo } from '@/utils/types/data/data.types'

import { useGetOneCheck, check, isCheckNotFound } from '../services/useGetOneCheck'
import { useGetOneCurrency, currency } from '../services/useGetOneCurrency'

const checkInfo = ref<TFormatListDataInfo | null>(null)

const isDataLoading = ref<boolean>(false)

const getFormatArrayItems = (checkData: ICheck): TFormatListDataInfo => {
  return [
    {
      titleName: 'Имя',
      value: checkData?.name
    },
    {
      titleName: 'Валюта',
      value: currency.value?.symbol
    },
    {
      titleName: 'Сумма',
      value: checkData?.amount.toLocaleString(currency.value?.designation)
    },
    {
      titleName: 'Время создания',
      value: new Date(checkData?.createdAt).toLocaleString()
    },
    {
      titleName: 'Время обновления',
      value: new Date(checkData?.updatedAt).toLocaleString()
    }
  ]
}

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  isDataLoading.value = true

  if (route.params.checkId) {
    await useGetOneCheck(route.params.checkId as TTypeTransaction)
  } else {
    isCheckNotFound.value = true
  }

  if (check.value?.currency) await useGetOneCurrency(check.value?.currency)

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
