<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import ListDataInfo from '@/components/wrappers/ListDataInfo/ListDataInfo.vue'
import type {
  ITransaction,
  TTypeTransaction,
  TFormatListDataInfo
} from '@/utils/types/data/data.types'

import {
  useGetOneTransaction,
  transaction,
  isTransactionNotFound
} from '../services/useGetOneTransaction'

import { check, useGetOneCheck } from '../services/useGetOneCheck'

import { category, useGetOneCategory } from '../services/useGetOneCategory'

import { translateType } from '@/utils/helpers'

const transactionInfo = ref<TFormatListDataInfo | null>(null)

const getFormatArrayItems = (transactionData: ITransaction): TFormatListDataInfo => {
  const FormatListDataInfo = [
    { titleName: 'Имя', value: transactionData?.name },
    {
      titleName: 'Тип',
      value: translateType[transactionData?.type]
    },
    {
      titleName: 'Сумма',
      value: transactionData?.amount.toLocaleString('ru-RU')
    },
    {
      titleName: 'Счет',
      value: check.value?.name,
      valueLinkTo: { name: 'Check', params: { checkId: check.value?.id } }
    },
    {
      titleName: 'Категория',
      value: category.value?.name,
      valueLinkTo: { name: 'Category', params: { categoryId: category.value?.id } }
    },
    { titleName: 'Время', value: new Date(transactionData?.time).toLocaleString('ru-RU') },
    { titleName: 'Описание', value: transactionData?.description },
    {
      titleName: 'Время создания',
      value: new Date(transactionData?.createdAt).toLocaleString('ru-RU')
    },
    {
      titleName: 'Время обновления',
      value: new Date(transactionData?.updatedAt).toLocaleString('ru-RU')
    }
  ]

  if (!check.value) delete FormatListDataInfo[3].valueLinkTo
  if (!category.value) delete FormatListDataInfo[4].valueLinkTo

  return FormatListDataInfo
}

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  if (route.params.transactionId) {
    await useGetOneTransaction(route.params.transactionId as TTypeTransaction)
  } else {
    return router.replace({ name: 'NotFounded' })
  }
  if (isTransactionNotFound.value) {
    return router.replace({ name: 'NotFounded' })
  }

  if (transaction.value?.check) await useGetOneCheck(transaction.value.check as TTypeTransaction)
  if (transaction.value?.category)
    await useGetOneCategory(transaction.value.category as TTypeTransaction)

  if (transaction.value) transactionInfo.value = getFormatArrayItems(transaction.value)
})
</script>

<template>
  <BarTopApp
    title="Транзакция"
    :showButtonEdit="true"
    @clickButtonEdit="
      $router.push({ name: 'TransactionsUpdate', params: { transactionId: transaction?.id } })
    "
  />
  <TemplateMain>
    <TemplateSection>
      <ListDataInfo :values="transactionInfo" />
    </TemplateSection>
  </TemplateMain>
</template>
