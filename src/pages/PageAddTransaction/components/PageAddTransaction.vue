<script setup lang="ts">
import { ref } from 'vue'

import type { ITypeTransaction } from '@/utils/types/types'
import type { INamePageRu } from '@/utils/types/interfaces'

import TemplateMain from '@/templates/TemplateMain.vue'
import TemplateSection from '@/templates/TemplateSection.vue'

import BarTopApp from '@/components/bars/BarTopApp/BarTopApp.vue'
import BarNavigate from '@/components/bars/BarNavigate/BarNavigate.vue'

import TitleHeader from '@/components/titles/TitleHeader.vue'

import { FormAddTransaction } from '@/modules/forms/FormAddTransaction/'

const namePage = ref<ITypeTransaction>('expense')
const namePageRu: INamePageRu = {
  expense: 'расхода',
  income: 'дохода'
}

const updateTypeHandler = (newValue: ITypeTransaction) => {
  namePage.value = newValue
}
</script>

<template>
  <BarTopApp :title="'Добавление ' + namePageRu[namePage]" />
  <TemplateMain>
    <TemplateSection>
      <TitleHeader
        v-if="namePage === 'expense'"
        title="Расход"
        icon="keyboard_double_arrow_down"
        color="#FF7676"
      />
      <TitleHeader
        v-else-if="namePage === 'income'"
        title="Доход"
        icon="keyboard_double_arrow_up"
        color="#76FF94"
      />
    </TemplateSection>
    <TemplateSection>
      <FormAddTransaction @updateType="updateTypeHandler" />
    </TemplateSection>
  </TemplateMain>
  <BarNavigate />
</template>

<style lang="scss"></style>
