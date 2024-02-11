<script setup lang="ts">
import '@material/web/list/list-item'

import type { IPropsListItemCheck } from './props.types'
import { computed } from 'vue'

const props = defineProps<IPropsListItemCheck>()

const getReadableAmount = computed(() => {
  let readableAmount = ''

  if (props.check) {
    if (typeof props.check.currency === 'object') {
      readableAmount = new Intl.NumberFormat(props.check.currency?.designation, {
        notation: 'standard',
        style: 'currency',
        currency: props.check.currency?.name,
        minimumFractionDigits: 0
      }).format(props.check.amount)
    }
  }

  return readableAmount
})
</script>

<template>
  <md-list-item
    type="button"
    @click="$router.push({ name: 'Check', params: { checkId: check.id } })"
  >
    <div slot="headline">{{ check.name }}</div>
    <div slot="supporting-text">
      {{ getReadableAmount }}
    </div>
    <span class="material-icons-outlined" slot="end"> chevron_right </span>
  </md-list-item>
</template>

<style lang="scss"></style>
