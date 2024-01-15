<script setup lang="ts">
import { reactive, ref, watch, onMounted } from 'vue'

import BarSnackbar from '@/components/bars/BarSnackbar/BarSnackbar.vue'

import InputWithIcon from '@/components/input/InputWithIcon/InputWithIcon.vue'
import InputList from '@/components/input/InputList/InputList.vue'

import { InputName } from '@/components/inputs/text/InputName'
import { InputSelectType } from '@/components/inputs/select/InputSelectType'
import { InputChoseColor } from '@/modules/inputs/InputChoseColor'
import { InputChoseIcon } from '@/modules/inputs/InputChoseIcon'
import SubmitFormButtons from '@/components/submit/SubmitFormButtons/SubmitFormButtons.vue'

import type { IFormFields } from '../types/formFields.types'
import type { TTypeTransaction } from '@/utils/types/data/data.types'

import useVuelidate from '@vuelidate/core'
import { ValidationErrors } from '@/utils/validations/validationErrors'
import { rules } from '../helpers/useValidateForm'

import {
  usePatchCategoryUpdate,
  postErrorText,
  serverValidateErrors
} from '../services/useSubmitForm'

import { useGetOneCategory, category, isCategoryNotFound } from '../services/useGetOneCategory'

const formData = reactive<IFormFields>({
  name: '',
  type: null,
  color: null,
  icon: null
})

const validation = useVuelidate(rules, formData, { $externalResults: serverValidateErrors })
const validationErrorsManager = new ValidationErrors(validation)

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const submitForm = async () => {
  validation.value.$clearExternalResults()
  if (!(await validation.value.$validate())) return
  if (route.params.categoryId && formData.name && formData.type && formData.color)
    await usePatchCategoryUpdate(
      route.params.categoryId as TTypeTransaction,
      formData.name,
      formData.type,
      formData.color.value,
      formData.icon?.value
    )
}

const isSnackbarOpen = ref<boolean>(false)
watch(postErrorText, () => {
  if (postErrorText.value) isSnackbarOpen.value = true
})

onMounted(async () => {
  if (route.params.categoryId) {
    await useGetOneCategory(route.params.categoryId as TTypeTransaction)
  } else {
    return router.replace({ name: 'NotFounded' })
  }
  if (isCategoryNotFound.value) {
    return router.replace({ name: 'NotFounded' })
  }

  formData.name = category.value?.name
  formData.type = category.value?.type
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
  <form class="form-update-category" @submit.prevent="submitForm" novalidate>
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
        <InputChoseColor v-model:modelValue="formData.color" :defaultValue="category?.color" />
      </template>
    </InputList>
    <InputList header="Иконка" :errrors="validationErrorsManager.getInputErrors('icon')">
      <template #content>
        <InputChoseIcon v-model:modelValue="formData.icon" :defaultValue="category?.icon" />
      </template>
    </InputList>
    <SubmitFormButtons />
  </form>
</template>

<style lang="scss" scoped>
.form-update-category {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;

  gap: 16px;
  margin-top: 32px;
}
</style>
