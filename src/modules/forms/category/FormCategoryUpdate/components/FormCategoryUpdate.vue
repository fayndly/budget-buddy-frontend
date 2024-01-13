<script setup lang="ts">
import { ref, onMounted } from 'vue'

import type { IColor } from '@/modules/inputs/InputChoseColor'
import type { ITypeTransaction } from '@/utils/types/types'
import type { IIcon } from '@/utils/types/data/data.types'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'
import InputList from '@/components/input/InputList/InputList.vue'

import { InputChoseColor } from '@/modules/inputs/InputChoseColor'
import { InputChoseIcon } from '@/modules/inputs/InputChoseIcon'
import InputNameCategory from '@/components/inputs/text/InputNameCategory/InputNameCategory.vue'
import { InputSelectType } from '@/components/inputs/select/InputSelectType'

import SubmitFormButtons from '@/components/submit/SubmitFormButtons/SubmitFormButtons.vue'

interface ICategoryData {
  _id: string
  user: string
  name: string
  type: 'expense' | 'income'
  color: string
  icon: string
  createdAt: string
  updatedAt: string
  __v: number
}

const getCategoryData = async (): Promise<ICategoryData> => {
  return {
    _id: '65393051366139b39ce5ecf1',
    user: '65393051366139b39ce5eced',
    name: 'Зарплата',
    type: 'income',
    color: '#e28909',
    icon: 'icon-category-income',
    __v: 0,
    createdAt: '2023-10-25T15:12:17.712Z',
    updatedAt: '2023-10-25T15:12:17.712Z'
  }
}

const categoryData = ref<ICategoryData | null>(null)

const nameField = ref<string>('')
const typeField = ref<ITypeTransaction | null>(null)
const colorField = ref<IColor>()
const iconField = ref<IIcon>()

const submitForm = async () => {
  const dataFormToString = `
name: ${nameField.value}
type: ${typeField.value}
color: ${colorField.value?.value}
icon: ${iconField.value?.value}
  `
  alert(dataFormToString)
}

const substituteValuesToForm = (data: ICategoryData) => {
  nameField.value = data.name
  typeField.value = data.type
  // colorField.value = data.color
  // iconField.value = data.icon
}

onMounted(async () => {
  categoryData.value = await getCategoryData()
  substituteValuesToForm(categoryData.value)
})
</script>

<template>
  <form class="form-add-category" @submit.prevent="submitForm">
    <InputWithIcon>
      <template #input>
        <InputNameCategory v-model:model-value="nameField" />
      </template>
    </InputWithIcon>
    <InputWithIcon>
      <template #input>
        <InputSelectType v-model:selected-value="typeField" />
      </template>
    </InputWithIcon>
    <InputList header="Цвет">
      <template #content>
        <InputChoseColor v-model:checked-value="colorField" :defaultColor="categoryData?.color" />
      </template>
    </InputList>
    <InputList header="Иконка">
      <template #content>
        <InputChoseIcon v-model:checked-value="iconField" />
      </template>
    </InputList>
    <SubmitFormButtons />
  </form>
</template>

<style lang="scss" scoped>
.form-add-category {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;

  gap: 16px;
  margin-top: 32px;
}
</style>
