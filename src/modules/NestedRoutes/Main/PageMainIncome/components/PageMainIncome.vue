<script setup lang="ts"></script>

<template>
  <div>
    <md-fab
      variant="primary"
      class="fab-add-transaction"
      aria-label="add"
      @click="$router.push({ name: 'AddTransaction', query: { type: 'income', check: 'check1' } })"
    >
      <span class="material-icons-outlined" slot="icon">add</span>
    </md-fab>
  </div>
</template>

<style lang="scss"></style>
