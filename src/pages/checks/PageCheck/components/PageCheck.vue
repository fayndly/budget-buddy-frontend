<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import '@material/web/button/text-button'

interface ICheckData {
  transactions: {
    expense: string[]
    income: string[]
  }
  _id: string
  user: string
  name: string
  amount: number
  currency: {
    _id: string
    name: string
    symbol: string
  }
  createdAt: string
  updatedAt: string
  __v: number
}

type TFormatArrayItems = Array<{ titleName: string; value: any; valueLinkTo?: any }>

const getCheckData = async (): Promise<ICheckData> => {
  return {
    transactions: {
      expense: ['653fe533ab8e6a94a540065b', '658429b3de78d0a1e535ecbe'],
      income: []
    },
    _id: '653fe517ab8e6a94a540064e',
    user: '65393051366139b39ce5eced',
    name: 'сбер',
    amount: -24000,
    currency: {
      _id: '653698b1a2cb054a9a95f3e1',
      name: 'RUB',
      symbol: '₽'
    },
    createdAt: '2023-10-30T17:17:11.217Z',
    updatedAt: '2023-12-21T12:04:03.853Z',
    __v: 9
  }
}

const checkInfo = ref<TFormatArrayItems | null>(null)

const getFormatArrayItems = (checkData: ICheckData): TFormatArrayItems => {
  return [
    {
      titleName: 'Имя',
      value: checkData?.name || 'Нет данных'
    },
    {
      titleName: 'Сумма',
      value: getReadableAmount(checkData?.amount, checkData?.currency) || 'Нет данных'
    },
    {
      titleName: 'Время создания',
      value: getReadableTime(checkData?.createdAt) || 'Нет данных'
    }
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
  checkInfo.value = getFormatArrayItems(await getCheckData())
})
</script>

<template>
  <BarTopApp title="Счет" />
  <TemplateMain>
    <TemplateSection>
      <ul class="check-info">
        <li class="check-info__item" v-for="item in checkInfo" :key="item.titleName">
          <h2 class="check-info__title title-medium on-surface-text">{{ item.titleName }}:</h2>
          <span
            v-if="item.valueLinkTo"
            class="title-medium primary-text"
            @click="$router.push(item.valueLinkTo)"
            >{{ item.value }}</span
          >
          <span v-else class="check-info__text title-medium on-background-text">{{
            item.value
          }}</span>
        </li>
      </ul>
    </TemplateSection>
  </TemplateMain>
</template>

<style lang="scss">
.check-info {
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
