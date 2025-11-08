<script setup lang="ts">
import '@material/web/iconbutton/icon-button'
import 'material-icons/iconfont/material-icons.css'
import '@material/web/progress/linear-progress'

interface IPropsBarTopApp {
  title: string
  showButtonBack?: boolean
  showButtonDelete?: boolean
  showButtonEdit?: boolean
  showProgress?: boolean
}
const emits = defineEmits(['clickButtonDelete', 'clickButtonEdit'])

withDefaults(defineProps<IPropsBarTopApp>(), {
  showButtonBack: true,
  showButtonDelete: false,
  showButtonEdit: false,
  showProgress: false
})
</script>

<template>
  <div class="bar-top-app surface" :class="{ 'bar-top-app--hide-back': !showButtonBack }">
    <div class="bar-top-app__left">
      <md-icon-button v-if="showButtonBack" @click="$router.go(-1)">
        <span class="material-icons-outlined">arrow_back</span>
      </md-icon-button>
      <h2 class="title-large on-surface-text">{{ title }}</h2>
    </div>
    <md-icon-button v-if="showButtonDelete" @click="emits('clickButtonDelete')">
      <span class="material-icons-outlined">delete</span>
    </md-icon-button>
    <md-icon-button v-if="showButtonEdit" @click="emits('clickButtonEdit')">
      <span class="material-icons-outlined">edit</span>
    </md-icon-button>
  </div>
  <md-linear-progress indeterminate class="progress" v-if="showProgress"></md-linear-progress>
</template>

<style lang="scss">
.progress {
  width: 100%;
  position: fixed;
  top: 64px;
}
.bar-top-app {
  width: 100%;
  min-height: 64px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 4px;
  padding-right: 16px;
  gap: 4px;

  transition: background-color 0.2s ease-in-out;

  &--hide-back {
    padding-left: 16px;
  }

  &__left {
    display: flex;
    align-items: center;
  }
}
</style>
