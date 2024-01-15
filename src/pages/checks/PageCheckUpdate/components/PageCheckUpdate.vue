<script setup lang="ts">
import { ref, watch } from 'vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'

import TitleHeader from '@/components/titles/TitleHeader.vue'

import BarSnackbar from '@/components/bars/BarSnackbar/BarSnackbar.vue'

import DialogConfirmDeletion from '@/components/dialogs/DialogConfirmDeletion/DialogConfirmDeletion.vue'

import { FormCheckUpdate, isLoading } from '@/modules/forms/check/FormCheckUpdate'
import { useDeleteCheck, isCheckDeleted, postErrorText } from '../services/useDeleteCheck'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const deleteCheckHandler = async () => {
  if (route.params.checkId) {
    await useDeleteCheck(route.params.checkId as TMongoObjectId)
  }
  if (isCheckDeleted.value) router.replace({ name: 'Checks' })
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
    title="Редактировать счет"
    :showButtonDelete="true"
    @clickButtonDelete="modalConfirmDeletionIsOpen = true"
    :showProgress="isLoading"
  />
  <TemplateMain>
    <TemplateSection>
      <TitleHeader title="Счет" icon="edit" />
    </TemplateSection>
    <TemplateSection>
      <FormCheckUpdate />
    </TemplateSection>
  </TemplateMain>
  <DialogConfirmDeletion
    headline="Подтверждение"
    text="Вы действительно хотите удалить этот счет?"
    :isOpen="modalConfirmDeletionIsOpen"
    @confirmDelete="deleteCheckHandler"
    @closeModal="closeModalHandler"
  />
</template>
