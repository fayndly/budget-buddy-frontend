<template>
  <section class="section">
    <div class="section__content">
      <slot></slot>
    </div>
  </section>
</template>

<style lang="scss">
.section {
  width: 100%;
  display: flex;
  justify-content: center;
  &__content {
    width: 100%;
    // max-width: 500px;
  }
}
</style>
