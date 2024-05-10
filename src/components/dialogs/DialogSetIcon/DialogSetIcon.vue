<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

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
  searcher.value = ''
}

onMounted(() => {
  data.value = materialIcons
})

const data = ref<string[]>([])

const searchHandler = computed(() => {
  return data.value.filter((el) => {
    return el.includes(searcher.value)
  })
})

const searcher = ref<string>('')
</script>

<template>
  <teleport to="body">
    <md-dialog type="alert" class="dialog" :open="isOpen" @cancel="closeModal">
      <div slot="headline" class="dialog__headline">{{ headline }}</div>
      <div slot="content" class="dialog__content">
        <md-outlined-text-field class="dialog__search-input" type="search" v-model="searcher">
          <span slot="leading-icon" class="material-icons-outlined">search</span>
        </md-outlined-text-field>
        <ul class="dialog__list-icons">
          <li v-for="icon in searchHandler" :key="icon" @click="submitHandler(icon)">
            <span class="material-icons-outlined">{{ icon }}</span>
          </li>
        </ul>
      </div>
      <div slot="actions" class="dialog__actions">
        <md-text-button form="form-color" type="button" @click="closeModal">Отмена</md-text-button>
      </div>
    </md-dialog>
  </teleport>
</template>

<style lang="scss" scoped>
md-dialog {
  margin: auto;
}

.dialog {
  &__headline {
  }
  &__content {
    height: 400px;
    width: 350px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__search-input {
    width: 100%;
  }
  &__list-icons {
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;

    align-content: flex-start;

    padding-inline-start: 0px;
    overflow-y: scroll;

    li {
      // flex-grow: 1;
      padding: 6px;
    }
  }
  &__actions {
  }
}
</style>
