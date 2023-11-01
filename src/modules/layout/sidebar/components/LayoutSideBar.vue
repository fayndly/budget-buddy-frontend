<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  openSidebar: {
    type: Boolean,
    required: true
  }
})

const links = ref([
  { name: 'Typography', href: '/typography' },
  { name: 'Buttons', href: '/buttons' },
  { name: 'Checkboxes', href: '/checkboxes' },
  { name: 'Radiobuttons', href: '/radio-buttons' },
  { name: 'Progress', href: '/progress' },
  { name: 'Inputs', href: '/inputs' },
  { name: 'Tabs', href: '/tabs' },
  { name: 'Tables', href: '/tables' }
])
</script>

<template>
  <div :class="['sidebar', { sidebar_isopen: openSidebar }]">
    <router-link class="sidebar__link" v-for="link in links" :key="link.name" :to="link.href">{{
      link.name
    }}</router-link>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  left: 0;
  top: 62px;
  height: 100%;
  background: #fff;
  position: fixed;
  width: 250px;
  z-index: 2;
  padding: 20px;
  transition: 0.2s;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
  transform: translateX(-250px);
  &_isopen {
    transform: translateX(0px);
  }
  &__link {
    display: block;
    border-radius: 12px;
    border: 2px solid #fff;
    transition: 0.2s;
    font-weight: bold;
    margin-bottom: 10px;
    &:hover {
      color: $color-primary;
    }
  }
}
</style>
