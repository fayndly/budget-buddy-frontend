<script setup lang="ts">
import { ref } from 'vue'

import '@material/web/list/list'
import '@material/web/list/list-item'

const categories = ref([
  {
    name: 'Транспорт',
    type: 'Расход',
    id: '123',
    icon: 'directions_car',
    color: '#FF4F4F'
  },
  {
    name: 'Интернет',
    type: 'Расход',
    id: '234',
    icon: 'language',
    color: '#5D4FFF'
  },
  {
    name: 'Взятка',
    type: 'Расход',
    id: '345',
    color: '#4FB5FF'
  }
])
</script>

<template>
  <md-list class="list-categories">
    <md-list-item
      type="button"
      v-for="category in categories"
      :key="category.id"
      class="list-categories__item"
      @click="$router.push({ name: 'Category', params: { categoryId: '123' } })"
    >
      <div slot="headline">{{ category.name }}</div>
      <div slot="supporting-text">
        {{ category.type }}
      </div>
      <span class="material-icons-outlined list-categories__item-icon-end" slot="end">
        chevron_right
      </span>
      <span
        class="material-icons-outlined list-categories__item-icon-start"
        slot="start"
        :style="`background-color: ${category.color};`"
      >
        {{ category.icon }}
      </span>
    </md-list-item>
  </md-list>
</template>

<style lang="scss">
.list-categories {
  &__item {
  }
  &__item-add {
  }
  &__item-add-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__item-icon-end {
  }
  &__item-icon-start {
    color: white;
    padding: 8px;
    min-width: 40px;
    min-height: 40px;
    border-radius: 50%;
  }
}
</style>
