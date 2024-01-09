<script setup lang="ts">
interface IPropsInputList {
  header: string
  errrors: string[]
}
defineProps<IPropsInputList>()
</script>

<template>
  <div class="wrapper-list-inputs">
    <div class="wrapper-list-inputs__title">
      <h3 class="wrapper-list-inputs__header outline-variant-text title-large">{{ header }}</h3>
      <span class="wrapper-list-inputs__errror title-small error-text" v-if="errrors.length">{{
        errrors[0]
      }}</span>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<style lang="scss">
.wrapper-list-inputs {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: calc(100% - 42px - 16px);
  gap: 8px;

  &__title {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}
</style>
