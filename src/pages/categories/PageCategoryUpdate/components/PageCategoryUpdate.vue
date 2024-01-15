<script setup lang="ts">
import { ref, watch } from 'vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'

import TitleHeader from '@/components/titles/TitleHeader.vue'

import BarSnackbar from '@/components/bars/BarSnackbar/BarSnackbar.vue'

import DialogConfirmDeletion from '@/components/dialogs/DialogConfirmDeletion/DialogConfirmDeletion.vue'

import { FormCategoryUpdate, isLoading } from '@/modules/forms/category/FormCategoryUpdate'
import { useDeleteCategory, isCategoryDeleted, postErrorText } from '../services/useDeleteCategory'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

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
  <BarTopApp
    title="Редактировать категорию"
    :showButtonDelete="true"
    @clickButtonDelete="modalConfirmDeletionIsOpen = true"
    :showProgress="isLoading"
  />
  <TemplateMain>
    <TemplateSection>
      <TitleHeader title="Категория" icon="edit" />
    </TemplateSection>
    <TemplateSection>
      <FormCategoryUpdate />
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
