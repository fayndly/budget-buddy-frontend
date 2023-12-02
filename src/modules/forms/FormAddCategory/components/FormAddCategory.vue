<script setup lang="ts">
import { ref } from 'vue'

import type { IColor } from '@/modules/inputs/InputChoseColor'
import type { ITypeTransaction } from '@/utils/types/types'
import type { IIcon } from '@/modules/inputs/InputChoseIcon'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'
import InputList from '@/components/input/InputList/InputList.vue'

import { InputChoseColor } from '@/modules/inputs/InputChoseColor'
import { InputChoseIcon } from '@/modules/inputs/InputChoseIcon'
import InputName from './custom/InputName/InputName.vue'
import InputSelectTypeTransaction from '@/components/inputs/select/InputSelectTypeTransaction/InputSelectTypeTransaction.vue'

import SubmitFormButtons from '@/components/submit/SubmitFormButtons/SubmitFormButtons.vue'

const nameField = ref<string>('')
const typeField = ref<ITypeTransaction | null>(null)
const colorField = ref<IColor>()
const iconField = ref<IIcon>()

typeField.value = 'expense'

const submitForm = async () => {
  const dataFormToString = `
name: ${nameField.value}
type: ${typeField.value}
color: ${colorField.value?.value}
icon: ${iconField.value?.value}
  `
  alert(dataFormToString)
}
</script>

<template>
  <form class="form-add-category" @submit.prevent="submitForm">
    <InputWithIcon>
      <template #input>
        <InputName v-model:model-value="nameField" />
      </template>
    </InputWithIcon>
    <InputWithIcon>
      <template #input>
        <InputSelectTypeTransaction v-model:selected-value="typeField" />
      </template>
    </InputWithIcon>
    <InputList header="Цвет">
      <template #content>
        <InputChoseColor v-model:checked-value="colorField" />
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
