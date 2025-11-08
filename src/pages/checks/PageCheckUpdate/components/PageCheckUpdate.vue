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

import { FormCheckUpdate, isLoading } from '@/modules/forms/check/FormCheckUpdate'
import {
  useDeleteCheck,
  isCheckDeleted,
  postErrorText,
  isDeleting
} from '../services/useDeleteCheck'

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

watch(postErrorText, () => {
  if (postErrorText.value) appErrorsStore.addError(postErrorText.value)
})

const isCheckNotFound = ref<boolean>(false)
const setNotFound = (value: boolean) => {
  isCheckNotFound.value = value
}

const isDataLoading = ref<boolean>(false)
const setLoading = (value: boolean) => {
  isDataLoading.value = value
}
</script>

<template>
  <BarTopApp
    title="Редактировать счет"
    :showButtonDelete="!isCheckNotFound && !isDataLoading"
    @clickButtonDelete="modalConfirmDeletionIsOpen = true"
    :showProgress="isLoading || isDeleting"
  />
  <TemplateMain>
    <SectionLoader v-if="isDataLoading" />
    <SectionNotFound
      header="Счет не найден"
      text="Возможно, он был удален и больше не доступен"
      v-if="isCheckNotFound && !isDataLoading"
    />
    <TemplateSection v-if="!isCheckNotFound && !isDataLoading">
      <TitleHeader title="Счет" icon="edit" />
    </TemplateSection>
    <TemplateSection v-show="!isCheckNotFound && !isDataLoading">
      <FormCheckUpdate @notFounded="setNotFound" @isLoading="setLoading" />
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
