<template>
  <main class="main">
    <slot></slot>
  </main>
</template>

<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;
}
</style>
