<script setup lang="ts">
import '@material/web/button/filled-button'
import '@material/web/button/outlined-button'
</script>

<template>
  <div class="submit-buttons">
    <md-outlined-button type="button">Отмена</md-outlined-button>
    <md-filled-button type="submit" disabled>
      Добавить
      <div slot="icon" style="width: 24px; height: 24px">
        <span class="material-icons-outlined">add</span>
      </div>
    </md-filled-button>
  </div>
</template>

<style lang="scss">
.submit-buttons {
  display: flex;
  gap: 8px;
}
</style>
