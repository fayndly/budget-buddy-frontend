<script setup lang="ts">
import { onMounted } from 'vue'
import '@material/web/list/list-item'

import type { IPropsListItemCheck } from './props.types'
import { useGetOneCurrency, currency } from './useGetOneCurrency'

const props = defineProps<IPropsListItemCheck>()

onMounted(async () => {
  props.check.currency && (await useGetOneCurrency(props.check.currency))
})
</script>

<template>
  <md-list-item
    type="button"
    @click="$router.push({ name: 'Check', params: { checkId: check.id } })"
  >
    <div slot="headline">{{ check.name }}</div>
    <div slot="supporting-text">
      {{ check.amount.toLocaleString(currency?.designation) }}{{ currency?.symbol }}
    </div>
    <span class="material-icons-outlined" slot="end"> chevron_right </span>
  </md-list-item>
</template>

<style lang="scss"></style>
