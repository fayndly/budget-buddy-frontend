<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import SectionLoader from '@/components/sections/SectionLoader/SectionLoader.vue'
import SectionNotFound from '@/components/sections/SectionNotFound/SectionNotFound.vue'

import ListDataInfo from '@/components/wrappers/ListDataInfo/ListDataInfo.vue'
import type {
  ITransaction,
  TMongoObjectId,
  TFormatListDataInfo
} from '@/utils/types/data/data.types'

import {
  useGetOneTransaction,
  transaction,
  isTransactionNotFound
} from '../services/useGetOneTransaction'

// import { check, useGetOneCheck } from '../services/useGetOneCheck'
// import { category, useGetOneCategory } from '../services/useGetOneCategory'
// import { currency, useGetOneCurrency } from '../services/useGetOneCurrency'

import { translateType } from '@/utils/helpers'

const transactionInfo = ref<TFormatListDataInfo | null>(null)

const isDataLoading = ref<boolean>(false)

const getFormatArrayItems = (transactionData: ITransaction): TFormatListDataInfo => {
  const FormatListDataInfo = [
    { titleName: 'Имя', value: transactionData?.name },
    {
      titleName: 'Тип',
      value: translateType[transactionData?.type]
    },
    // {
    //   titleName: 'Валюта',
    //   value: currency.value?.symbol
    // },
    // {
    //   titleName: 'Сумма',
    //   value: transactionData?.amount.toLocaleString(currency.value?.designation)
    // },
    // {
    //   titleName: 'Счет',
    //   value: check.value?.name,
    //   valueLinkTo: { name: 'Check', params: { checkId: check.value?.id } }
    // },
    // {
    //   titleName: 'Категория',
    //   value: category.value?.name,
    //   valueLinkTo: { name: 'Category', params: { categoryId: category.value?.id } }
    // },
    { titleName: 'Время', value: new Date(transactionData?.time).toLocaleString() },
    { titleName: 'Описание', value: transactionData?.description },
    {
      titleName: 'Время создания',
      value: new Date(transactionData?.createdAt).toLocaleString()
    },
    {
      titleName: 'Время обновления',
      value: new Date(transactionData?.updatedAt).toLocaleString()
    }
  ]

  // if (!check.value) delete FormatListDataInfo[3].valueLinkTo
  // if (!category.value) delete FormatListDataInfo[4].valueLinkTo

  return FormatListDataInfo
}

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  isDataLoading.value = true

  if (route.params.transactionId) {
    await useGetOneTransaction(route.params.transactionId as TMongoObjectId)
  } else {
    isTransactionNotFound.value = true
  }

  // transaction.value?.check && (await useGetOneCheck(transaction.value.check))
  // transaction.value?.category && (await useGetOneCategory(transaction.value.category))
  // transaction.value?.currency && (await useGetOneCurrency(transaction.value.currency))

  if (transaction.value) transactionInfo.value = getFormatArrayItems(transaction.value)

  isDataLoading.value = false
})
</script>

<template>
  <BarTopApp
    title="Транзакция"
    :showButtonEdit="!isTransactionNotFound"
    @clickButtonEdit="
      router.push({ name: 'TransactionsUpdate', params: { transactionId: transaction?.id } })
    "
  />
  <TemplateMain>
    <SectionLoader v-if="isDataLoading" />
    <SectionNotFound
      header="Транзакция не найдена"
      text="Возможно, она была удалена и больше не доступна"
      v-if="isTransactionNotFound"
    />
    <TemplateSection>
      <ListDataInfo :values="transactionInfo" />
    </TemplateSection>
  </TemplateMain>
</template>
