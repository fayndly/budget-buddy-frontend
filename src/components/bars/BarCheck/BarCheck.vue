<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'

import '@material/web/iconbutton/icon-button'
import '@material/web/menu/menu'
import '@material/web/menu/menu-item'

const props = defineProps(['chosedCheck', 'checks'])

onMounted(() => {
  const anchorEl = document.body.querySelector('#usage-anchor')
  const menuEl = document.body.querySelector('#usage-menu')

  anchorEl.addEventListener('click', () => {
    menuEl.open = !menuEl.open
  })
})

const isButtonSelected = ref(false)

const clickButtonSelectedHandler = () => {
  isButtonSelected.value = !isButtonSelected.value
}

const newChosedChecks = ref()

onUpdated(() => {
  newChosedChecks.value = props.chosedCheck
})

import { useRouter, useRoute } from 'vue-router'
import type { ICheck } from '@/utils/types/interfaces'
const router = useRouter()
const route = useRoute()
const clickMenuButtonHandler = (check: ICheck) => {
  router.push({ name: 'MainExpense', params: { checkId: check.id } })
}
</script>

<template>
  <div class="bar-check surface">
    <div class="bar-check__chose-check">
      <p class="bar-check__name-check title-large on-surface-text">{{ newChosedChecks?.name }}</p>
      <md-icon-button
        id="usage-anchor"
        @click="clickButtonSelectedHandler"
        :selected="isButtonSelected"
      >
        <span class="material-icons-outlined">arrow_drop_down</span>
        <span class="material-icons-outlined" slot="selected">arrow_drop_up</span>
      </md-icon-button>
      <md-menu id="usage-menu" anchor="usage-anchor" @closing="clickButtonSelectedHandler">
        <md-menu-item
          v-for="check in checks"
          :key="check.id"
          @click="clickMenuButtonHandler(check)"
        >
          <div slot="headline">{{ check.name }}</div>
        </md-menu-item>
        <md-menu-item @click="$router.push({ name: 'AddCheck' })">
          <div slot="headline" class="add-check">
            <span class="material-icons-outlined">add</span>
          </div>
        </md-menu-item>
      </md-menu>
    </div>
    <p class="bar-check__count-check title-large on-surface-text">123.23₽</p>
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
