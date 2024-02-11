<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

import BarSnackbar from '@/components/bars/BarSnackbar/BarSnackbar.vue'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'
import InputList from '@/components/input/InputList/InputList.vue'

import { InputName } from '@/components/inputs/text/InputName'
import { InputSelectType } from '@/components/inputs/select/InputSelectType'
import { InputChoseColor } from '@/modules/inputs/InputChoseColor'
import { InputChoseIcon } from '@/modules/inputs/InputChoseIcon'
import SubmitFormButtons from '@/components/submit/SubmitFormButtons/SubmitFormButtons.vue'

import type { IFormFields } from '../types/formFields.types'

import useVuelidate from '@vuelidate/core'
import { ValidationErrors } from '@/utils/validations/validationErrors'
import { rules } from '../helpers/useValidateForm'

import { usePostCheckAdd, postErrorText, serverValidateErrors } from '../services/useSubmitForm'

import { useQueryHandler } from '../helpers/useQueryHandler'
import { useRoute } from 'vue-router'

const formData = reactive<IFormFields>({
  name: '',
  type: null,
  color: null,
  icon: null
})

const validation = useVuelidate(rules, formData, { $externalResults: serverValidateErrors })
const validationErrorsManager = new ValidationErrors(validation)

const route = useRoute()
useQueryHandler(route, formData)

const submitForm = async () => {
  validation.value.$clearExternalResults()
  if (!(await validation.value.$validate())) return

  const formatData = Object.assign({}, formData) as any
  formatData.color = formatData.color?.value
  formatData.icon = formatData.icon?.value
  await usePostCheckAdd(formatData)
}

const isSnackbarOpen = ref<boolean>(false)
watch(postErrorText, () => {
  if (postErrorText.value) isSnackbarOpen.value = true
})
</script>

<template>
  <Teleport to="#app">
    <BarSnackbar
      :title="postErrorText"
      :isOpen="isSnackbarOpen"
      @clickButtonClose="isSnackbarOpen = false"
    />
  </Teleport>
  <form class="form-add-category" @submit.prevent="submitForm" novalidate>
    <InputWithIcon>
      <template #input>
        <InputName
          v-model:modelValue="formData.name"
          :hasError="validationErrorsManager.isInputHasErrors('name')"
          :errors="validationErrorsManager.getInputErrors('name')"
        />
      </template>
    </InputWithIcon>
    <InputWithIcon>
      <template #input>
        <InputSelectType
          v-model:modelValue="formData.type"
          :hasError="validationErrorsManager.isInputHasErrors('type')"
          :errors="validationErrorsManager.getInputErrors('type')"
        />
      </template>
    </InputWithIcon>
    <InputList header="Цвет" :errrors="validationErrorsManager.getInputErrors('color')">
      <template #content>
        <InputChoseColor v-model:modelValue="formData.color" />
      </template>
    </InputList>
    <InputList header="Иконка" :errrors="validationErrorsManager.getInputErrors('icon')">
      <template #content>
        <InputChoseIcon v-model:modelValue="formData.icon" />
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
