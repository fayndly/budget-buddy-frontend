<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import '@material/web/button/text-button'

interface ITransactionData {
  _id: string
  user: string
  type: 'expense' | 'income'
  shortDescription: string
  currency: {
    _id: string
    name: string
    symbol: string
  }
  amount: number
  check: {
    _id: string
    name: string
  }
  category: {
    _id: string
    name: string
    type: 'expense' | 'income'
    color: string
    icon: string
  }
  time: string
  fullDescription: string
  createdAt: string
  updatedAt: string
  __v: number
}

type TFormatArrayItems = Array<{ titleName: string; value: any; valueLinkTo?: any }>

const translateType = {
  expense: 'Расход',
  income: 'Доход',
  notFounded: 'Нет данных'
}

const getTransactionData = async (): Promise<ITransactionData> => {
  return {
    _id: '658429b3de78d0a1e535ecbe',
    user: '65393051366139b39ce5eced',
    type: 'expense',
    shortDescription: 'text',
    currency: {
      _id: '653698b1a2cb054a9a95f3e1',
      name: 'RUB',
      symbol: '₽'
    },
    amount: 12000,
    check: {
      _id: '653fe517ab8e6a94a540064e',
      name: 'сбер'
    },
    category: {
      _id: '65393051366139b39ce5ecf2',
      name: 'Инвестиции',
      type: 'income',
      color: '#1a1a1a',
      icon: 'icon-category-income'
    },
    time: '2023-10-01T00:00:00.000Z',
    fullDescription: 'text',
    createdAt: '2023-12-21T12:04:03.585Z',
    updatedAt: '2023-12-21T12:04:03.585Z',
    __v: 0
  }
}

const transactionInfo = ref<TFormatArrayItems | null>(null)

const getFormatArrayItems = (transactionData: ITransactionData): TFormatArrayItems => {
  return [
    { titleName: 'Краткое описание', value: transactionData?.shortDescription || 'Нет данных' },
    {
      titleName: 'Тип',
      value: translateType[transactionData?.type || 'notFounded'] || 'Нет данных'
    },
    {
      titleName: 'Сумма',
      value: getReadableAmount(transactionData?.amount, transactionData?.currency) || 'Нет данных'
    },
    {
      titleName: 'Счет',
      value: transactionData?.check.name || 'Нет данных',
      valueLinkTo: { name: 'Check', params: { checkId: transactionData?.check._id } }
    },
    {
      titleName: 'Категория',
      value: transactionData?.category.name || 'Нет данных',
      valueLinkTo: { name: 'Category', params: { categoryId: transactionData?.category._id } }
    },
    { titleName: 'Время', value: getReadableTime(transactionData?.time) || 'Нет данных' },
    { titleName: 'Полное описание', value: transactionData?.fullDescription || 'Нет данных' }
  ]
}

const getReadableTime = (time: string | undefined): string => {
  if (!time) {
    return 'Нет данных'
  }
  return new Date(time).toLocaleDateString('ru-RU')
}

const getReadableAmount = (
  amount: number | undefined,
  currency:
    | {
        _id: string
        name: string
        symbol: string
      }
    | undefined
): string => {
  if (amount && currency) {
    return amount.toLocaleString('ru-RU') + currency.symbol
  } else {
    return 'Нет данных'
  }
  // transactionInfo?.currency.symbol
}

onMounted(async () => {
  transactionInfo.value = getFormatArrayItems(await getTransactionData())
})
</script>

<template>
  <BarTopApp title="Транзакция" />
  <TemplateMain>
    <TemplateSection>
      <ul class="transaction-info">
        <li class="transaction-info__item" v-for="item in transactionInfo" :key="item.titleName">
          <h2 class="transaction-info__title title-medium on-surface-text">
            {{ item.titleName }}:
          </h2>
          <span
            v-if="item.valueLinkTo"
            class="title-medium primary-text"
            @click="$router.push(item.valueLinkTo)"
            >{{ item.value }}</span
          >
          <span v-else class="transaction-info__text title-medium on-background-text">{{
            item.value
          }}</span>
        </li>
      </ul>
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss">
.transaction-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  &__item {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 8px;
  }
  &__title {
  }
  &__text {
    text-align: end;
  }
}
</style>
