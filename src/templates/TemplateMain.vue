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

  width: 100%;
  flex-grow: 1;
  padding: 16px;
  gap: 8px;
  // min-height: 100vh;
  overflow-y: scroll;
}
</style>
