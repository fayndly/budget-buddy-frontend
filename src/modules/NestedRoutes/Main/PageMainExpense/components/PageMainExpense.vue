<script setup lang="ts"></script>

<template>
  <div>
    <md-fab
      variant="primary"
      class="fab-add-transaction"
      aria-label="add"
      @click="$router.push({ name: 'AddTransaction', query: { type: 'expense', check: 'check1' } })"
    >
      <span class="material-icons-outlined" slot="icon">add</span>
    </md-fab>
  </div>
</template>

<style lang="scss">
.fab-add-transaction {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>
