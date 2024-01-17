<script setup lang="ts">
import { ref, watch } from 'vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'

import TitleHeader from '@/components/titles/TitleHeader.vue'
import SectionNotFound from '@/components/sections/SectionNotFound/SectionNotFound.vue'

import BarSnackbar from '@/components/bars/BarSnackbar/BarSnackbar.vue'

import DialogConfirmDeletion from '@/components/dialogs/DialogConfirmDeletion/DialogConfirmDeletion.vue'

import { FormTransactionUpdate, isLoading } from '@/modules/forms/transaction/FormTransactionUpdate'
import {
  useDeleteTransaction,
  isTransactionDeleted,
  postErrorText
} from '../services/useDeleteTransaction'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const deleteTransactionHandler = async () => {
  if (route.params.transactionId) {
    await useDeleteTransaction(route.params.transactionId as TMongoObjectId)
  }
  if (isTransactionDeleted.value) router.replace({ name: 'Main' })
}

const modalConfirmDeletionIsOpen = ref<boolean>(false)
const closeModalHandler = () => {
  modalConfirmDeletionIsOpen.value = false
}

const isSnackbarOpen = ref<boolean>(false)
watch(postErrorText, () => {
  if (postErrorText.value) isSnackbarOpen.value = true
})

const isTransactionNotFound = ref<boolean>(false)
const setNotFound = (value: boolean) => {
  isTransactionNotFound.value = value
}
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
    title="Редактировать транзакцию"
    :showButtonDelete="!isTransactionNotFound"
    @clickButtonDelete="modalConfirmDeletionIsOpen = true"
    :showProgress="isLoading"
  />
  <TemplateMain>
    <SectionNotFound
      header="Транзакция не найдена"
      text="Возможно, она была удалена и больше не доступна"
      v-if="isTransactionNotFound"
    />
    <TemplateSection v-if="!isTransactionNotFound">
      <TitleHeader title="Транзакция" icon="edit" />
    </TemplateSection>
    <TemplateSection v-if="!isTransactionNotFound">
      <FormTransactionUpdate @notFounded="setNotFound" />
    </TemplateSection>
  </TemplateMain>
  <DialogConfirmDeletion
    headline="Подтверждение"
    text="Вы действительно хотите удалить эту транзакцию?"
    :isOpen="modalConfirmDeletionIsOpen"
    @confirmDelete="deleteTransactionHandler"
    @closeModal="closeModalHandler"
  />
</template>

<style lang="scss"></style>
