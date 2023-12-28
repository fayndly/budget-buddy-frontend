<script setup lang="ts">
import { ref } from 'vue'
import '@material/web/button/filled-button'
import '@material/web/progress/circular-progress'

import type { IPropsButtonSubmitAuth } from '../types/props.types'
defineProps<IPropsButtonSubmitAuth>()

const isProgressShow = ref<boolean>(false)
</script>

<template>
  <div class="button-submit-auth">
    <md-circular-progress
      class="button-submit-auth__profress"
      v-if="isProgressShow && isLoading"
      indeterminate
    ></md-circular-progress>
    <md-filled-button
      class="button-submit-auth__button"
      v-else
      @click="isProgressShow = !isProgressShow"
    >
      {{ text }}
    </md-filled-button>
  </div>
</template>

<style lang="scss">
.button-submit-auth {
  &__profress {
    --md-circular-progress-size: 40px;
  }
  &__button {
  }
}
</style>
