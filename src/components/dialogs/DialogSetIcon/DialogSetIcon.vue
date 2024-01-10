<script setup lang="ts">
import { ref } from 'vue'

import { materialIcons } from '@/assets/mocks/MaterialIcons'

import '@material/web/button/text-button'
import '@material/web/dialog/dialog'

import type { IPropsDialogSetIcon } from './types/props.types'

defineProps<IPropsDialogSetIcon>()

const emits = defineEmits(['submitColor', 'closeModal'])

const submitHandler = (icon: string): void => {
  emits('submitColor', icon)
  closeModal()
}

const closeModal = () => {
  emits('closeModal')
}
</script>

<template>
  <teleport to="body">
    <md-dialog type="alert" :open="isOpen" @cancel="closeModal">
      <div slot="headline">{{ headline }}</div>
      <div slot="content">
        <ul class="list-ucons">
          <li v-for="icon in materialIcons" :key="icon" @click="submitHandler(icon)">
            <span class="material-icons-outlined">{{ icon }}</span>
          </li>
        </ul>
      </div>
      <div slot="actions">
        <md-text-button form="form-color" type="button" @click="closeModal">Отмена</md-text-button>
      </div>
    </md-dialog>
  </teleport>
</template>

<style lang="scss">
md-dialog {
  margin: auto;
}

.list-ucons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;

  padding-inline-start: 4px;

  li {
    padding: 4px;
  }
}
</style>
