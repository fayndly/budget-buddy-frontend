<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

import type { ICheck, TMongoObjectId } from '@/utils/types/data/data.types'

import { getById } from '@/utils/helpers/getById'

import '@material/web/iconbutton/icon-button'
import '@material/web/menu/menu'
import '@material/web/menu/menu-item'

import { checks, useGetChecks } from '../services/useGetChecks'
import { currency, useGetOneCurrency } from '../services/useGetOneCurrency'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const chosedCheck = ref<ICheck | null>(null)

const isMenuOpen = ref<boolean>(false)

const clickButtonShowMenuHandler = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const clickMenuItemHandler = (check: ICheck) => {
  router.replace({ name: 'Main', params: { checkId: check.id } })
}

const getSelectedCheck = (id: TMongoObjectId) => {
  return getById<ICheck>(checks, id)
}

const getCheckIdFromRoute = computed(() => {
  return route.params.checkId as TMongoObjectId
})

watch(route, () => {
  chosedCheck.value = getSelectedCheck(getCheckIdFromRoute.value)
})

onMounted(async () => {
  await useGetChecks()

  if (!route.params.checkId) {
    router.replace({ name: 'Main', params: { checkId: checks.value[0].id } })
  }

  chosedCheck.value = getSelectedCheck(getCheckIdFromRoute.value)

  chosedCheck.value?.currency && (await useGetOneCurrency(chosedCheck.value.currency))
})
</script>

<template>
  <div class="bar-check surface">
    <div class="bar-check__chose-check">
      <p class="bar-check__name-check title-large on-surface-text">{{ chosedCheck?.name }}</p>
      <md-icon-button id="usage-anchor" @click="clickButtonShowMenuHandler" :selected="isMenuOpen">
        <span class="material-icons-outlined">arrow_drop_down</span>
        <span class="material-icons-outlined" slot="selected">arrow_drop_up</span>
      </md-icon-button>
      <md-menu
        id="usage-menu"
        anchor="usage-anchor"
        @closing="isMenuOpen = false"
        :open="isMenuOpen"
      >
        <md-menu-item
          v-for="check in checks"
          :key="check.id"
          @click="clickMenuItemHandler(check)"
          :selected="check.id === chosedCheck?.id"
        >
          <div slot="headline">{{ check.name }}</div>
        </md-menu-item>
        <md-menu-item @click="$router.push({ name: 'ChecksAdd' })">
          <div slot="headline" class="add-check">
            <span class="material-icons-outlined">add</span>
          </div>
        </md-menu-item>
      </md-menu>
    </div>
    <p class="bar-check__count-check title-large on-surface-text">
      {{ chosedCheck?.amount.toLocaleString(currency?.designation) }}{{ currency?.symbol }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.bar-check {
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0px 16px;
  gap: 8px;

  transition: background-color 0.2s ease-in-out;
  &__name-check {
  }
  &__count-check {
  }
  &__chose-check {
    flex-grow: 1;

    display: flex;
    align-items: center;
    position: relative;

    gap: 8px;
  }
}
.add-check {
  margin: auto;
}
</style>
