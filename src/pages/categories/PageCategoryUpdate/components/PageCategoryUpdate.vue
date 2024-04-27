<script setup lang="ts">
import { ref, watch } from 'vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'

import TitleHeader from '@/components/titles/TitleHeader.vue'
import SectionLoader from '@/components/sections/SectionLoader/SectionLoader.vue'
import SectionNotFound from '@/components/sections/SectionNotFound/SectionNotFound.vue'

import DialogConfirmDeletion from '@/components/dialogs/DialogConfirmDeletion/DialogConfirmDeletion.vue'

import { FormCategoryUpdate, isLoading } from '@/modules/forms/category/FormCategoryUpdate'
import {
  useDeleteCategory,
  isCategoryDeleted,
  postErrorText,
  isDeleting
} from '../services/useDeleteCategory'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import { useAppErrorsStore } from '@/modules/AppErrors'
const appErrorsStore = useAppErrorsStore()

const deleteCategoryHandler = async () => {
  if (route.params.categoryId) {
    await useDeleteCategory(route.params.categoryId as TMongoObjectId)
  }
  if (isCategoryDeleted.value) router.replace({ name: 'Categories' })
}

const modalConfirmDeletionIsOpen = ref<boolean>(false)
const closeModalHandler = () => {
  modalConfirmDeletionIsOpen.value = false
}

watch(postErrorText, () => {
  if (postErrorText.value) appErrorsStore.addError(postErrorText.value)
})

const isCategoryNotFound = ref<boolean>(false)
const setNotFound = (value: boolean) => {
  isCategoryNotFound.value = value
}

const isDataLoading = ref<boolean>(false)
const setLoading = (value: boolean) => {
  isDataLoading.value = value
}
</script>

<template>
  <BarTopApp
    title="Редактировать категорию"
    :showButtonDelete="!isCategoryNotFound && !isDataLoading"
    @clickButtonDelete="modalConfirmDeletionIsOpen = true"
    :showProgress="isLoading || isDeleting"
  />
  <TemplateMain>
    <SectionLoader v-if="isDataLoading" />
    <SectionNotFound
      header="Категория не найдена"
      text="Возможно, она была удалена и больше не доступна"
      v-if="isCategoryNotFound && !isDataLoading"
    />
    <TemplateSection v-if="!isCategoryNotFound && !isDataLoading">
      <TitleHeader title="Категория" icon="edit" />
    </TemplateSection>
    <TemplateSection v-show="!isCategoryNotFound && !isDataLoading">
      <FormCategoryUpdate @notFounded="setNotFound" @isLoading="setLoading" />
    </TemplateSection>
  </TemplateMain>
  <DialogConfirmDeletion
    headline="Подтверждение"
    text="Вы действительно хотите удалить эту категорию?"
    :isOpen="modalConfirmDeletionIsOpen"
    @confirmDelete="deleteCategoryHandler"
    @closeModal="closeModalHandler"
  />
</template>
