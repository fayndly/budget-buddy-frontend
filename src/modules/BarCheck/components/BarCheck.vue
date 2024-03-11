<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import '@material/web/iconbutton/icon-button'
import '@material/web/menu/menu'
import '@material/web/menu/menu-item'

import { useBarCheckStore } from '../stores/BarCheck'
import { storeToRefs } from 'pinia'

const barCheckStore = useBarCheckStore()

const { chosedCheck, checks } = storeToRefs(barCheckStore)

const getReadableAmount = computed(() => {
  let readableAmount = ''

  if (chosedCheck.value) {
    if (typeof chosedCheck.value.currency === 'object') {
      readableAmount = new Intl.NumberFormat(chosedCheck.value.currency?.designation, {
        notation: 'standard',
        style: 'currency',
        currency: chosedCheck.value.currency?.name,
        minimumFractionDigits: 0
      }).format(chosedCheck.value.amount)
    }
  }

  return readableAmount
})

const isMenuOpen = ref<boolean>(false)

const clickToggleShowMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

onMounted(() => {
  barCheckStore.uploadChecks()
})
</script>

<template>
  <div class="bar-check surface">
    <div class="bar-check__chose-check">
      <label for="usage-anchor" class="bar-check__label">
        <p class="bar-check__name-check title-large on-surface-text">
          {{ chosedCheck?.name }}
        </p>
        <md-icon-button id="usage-anchor" @click="clickToggleShowMenu" :selected="isMenuOpen">
          <span class="material-icons-outlined">arrow_drop_down</span>
          <span class="material-icons-outlined" slot="selected">arrow_drop_up</span>
        </md-icon-button>
      </label>
      <md-menu
        id="usage-menu"
        anchor="usage-anchor"
        @closing="isMenuOpen = false"
        :open="isMenuOpen"
      >
        <md-menu-item
          v-for="check in checks"
          :key="check.id"
          @click="barCheckStore.setCheck(check)"
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
      {{ getReadableAmount }}
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
  padding: 0 16px;
  gap: 8px;

  transition: background-color 0.2s ease-in-out;
  &__label {
    display: flex;
    align-items: center;
  }
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
