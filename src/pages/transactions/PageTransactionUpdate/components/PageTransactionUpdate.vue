<script setup lang="ts">
import { ref, watch } from 'vue'
import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'

import TitleHeader from '@/components/titles/TitleHeader.vue'
import SectionLoader from '@/components/sections/SectionLoader/SectionLoader.vue'
import SectionNotFound from '@/components/sections/SectionNotFound/SectionNotFound.vue'

import { useAppErrorsStore } from '@/modules/AppErrors'
const appErrorsStore = useAppErrorsStore()

import DialogConfirmDeletion from '@/components/dialogs/DialogConfirmDeletion/DialogConfirmDeletion.vue'

import { FormTransactionUpdate, isLoading } from '@/modules/forms/transaction/FormTransactionUpdate'
import {
  useDeleteTransaction,
  isTransactionDeleted,
  postErrorText,
  isDeleting
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

watch(postErrorText, () => {
  if (postErrorText.value) appErrorsStore.addError(postErrorText.value)
})

const isTransactionNotFound = ref<boolean>(false)
const setNotFound = (value: boolean) => {
  isTransactionNotFound.value = value
}

const isDataLoading = ref<boolean>(false)
const setLoading = (value: boolean) => {
  isDataLoading.value = value
}
</script>

<template>
  <BarTopApp
    title="Редактировать транзакцию"
    :showButtonDelete="!isTransactionNotFound && !isDataLoading"
    @clickButtonDelete="modalConfirmDeletionIsOpen = true"
    :showProgress="isLoading || isDeleting"
  />
  <TemplateMain>
    <SectionLoader v-if="isDataLoading" />
    <SectionNotFound
      header="Транзакция не найдена"
      text="Возможно, она была удалена и больше не доступна"
      v-if="isTransactionNotFound && !isDataLoading"
    />
    <TemplateSection v-if="!isTransactionNotFound && !isDataLoading">
      <TitleHeader title="Транзакция" icon="edit" />
    </TemplateSection>
    <TemplateSection v-show="!isTransactionNotFound && !isDataLoading">
      <FormTransactionUpdate @notFounded="setNotFound" @isLoading="setLoading" />
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
