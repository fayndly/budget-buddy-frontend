<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import ListDataInfo from '@/components/wrappers/ListDataInfo/ListDataInfo.vue'

import type { ICheck, TTypeTransaction, TFormatListDataInfo } from '@/utils/types/data/data.types'

import { useGetOneCheck, check, isCheckNotFound } from '../services/useGetOneCheck'

const checkInfo = ref<TFormatListDataInfo | null>(null)

const getFormatArrayItems = (checkData: ICheck): TFormatListDataInfo => {
  return [
    {
      titleName: 'Имя',
      value: checkData?.name
    },
    {
      titleName: 'Сумма',
      value: checkData?.amount.toLocaleString('ru-RU')
    },
    {
      titleName: 'Время создания',
      value: new Date(checkData?.createdAt).toLocaleString('ru-RU')
    },
    {
      titleName: 'Время обновления',
      value: new Date(checkData?.updatedAt).toLocaleString('ru-RU')
    }
  ]
}

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.params.checkId) {
    await useGetOneCheck(route.params.checkId as TTypeTransaction)
  } else {
    router.replace({ name: 'NotFounded' })
  }
  if (isCheckNotFound.value) router.replace({ name: 'NotFounded' })

  if (check.value) checkInfo.value = getFormatArrayItems(check.value)
})
</script>

<template>
  <BarTopApp
    title="Счет"
    :showButtonEdit="true"
    @clickButtonEdit="$router.push({ name: 'ChecksUpdate', params: { checkId: check?.id } })"
  />
  <TemplateMain>
    <TemplateSection>
      <ListDataInfo :values="checkInfo" />
    </TemplateSection>
  </TemplateMain>
</template>
