<script setup lang="ts">
import '@material/web/button/filled-button'
import '@material/web/button/outlined-button'

const emits = defineEmits(['clickButtonBack', 'clickButtonSubmit'])

import { useRouter } from 'vue-router'
const router = useRouter()

const clickButtonBackHandler = () => {
  emits('clickButtonBack')
  router.back()
}

const clickButtonSubmitHandler = () => {
  emits('clickButtonSubmit')
  router.back()
}
</script>

<template>
  <div class="submit-buttons">
    <md-outlined-button type="button" @click="clickButtonBackHandler">Отмена</md-outlined-button>
    <md-filled-button type="submit" @click="clickButtonSubmitHandler">
      Подтвердить
    </md-filled-button>
  </div>
</template>

<style lang="scss">
.submit-buttons {
  display: flex;
  gap: 8px;
}
</style>
