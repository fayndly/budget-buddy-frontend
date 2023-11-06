<script setup lang="ts">
import '@material/web/iconbutton/icon-button'
import 'material-icons/iconfont/material-icons.css'
</script>

<template>
  <nav class="navbar surface">
    <router-link :to="{ name: 'Main' }">
      <md-icon-button>
        <span class="material-icons-outlined">home</span>
      </md-icon-button>
    </router-link>
    <router-link :to="{ name: 'Settings' }">
      <md-icon-button>
        <span class="material-icons-outlined">settings</span>
      </md-icon-button>
    </router-link>
  </nav>
</template>

<style lang="scss">
.navbar {
  width: 100%;
  min-height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
