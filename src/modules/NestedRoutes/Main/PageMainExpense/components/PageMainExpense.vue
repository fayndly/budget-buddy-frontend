<script setup lang="ts">
import GraphDiogram from '@/components/graphs/GraphDiogram/GraphDiogram.vue'

const transactionsData = [
  {
    count: 12345,
    color: '#FF4F4F',
    strokeDasharray: 0,
    strokeDashoffset: 0
  },
  {
    count: 345,
    color: '#5D4FFF',
    strokeDasharray: 0,
    strokeDashoffset: 0
  },
  {
    count: 4253,
    color: '#4FB5FF',
    strokeDasharray: 0,
    strokeDashoffset: 0
  },
  {
    count: 6253,
    color: '#FFC34F',
    strokeDasharray: 0,
    strokeDashoffset: 0
  },
  {
    count: 9876,
    color: '#AAAAAA',
    strokeDasharray: 0,
    strokeDashoffset: 0
  },
  {
    count: 4567,
    color: '#FFF',
    strokeDasharray: 0,
    strokeDashoffset: 0
  }
]
</script>

<template>
  <GraphDiogram :data="transactionsData" />
  <md-fab
    variant="primary"
    class="fab-add-transaction"
    aria-label="add"
    @click="$router.push({ name: 'AddTransaction', query: { type: 'expense', check: 'check1' } })"
  >
    <span class="material-icons-outlined" slot="icon">add</span>
  </md-fab>
</template>

<style lang="scss">
.fab-add-transaction {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>
