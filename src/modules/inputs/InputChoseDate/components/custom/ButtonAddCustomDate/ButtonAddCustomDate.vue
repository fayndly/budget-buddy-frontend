<script setup lang="ts">
import '@material/web/iconbutton/filled-tonal-icon-button'
</script>

<template>
  <md-filled-tonal-icon-button class="button-set-date" type="button">
    <div class="button-set-date__icon-wrapper">
      <span class="button-set-date__icon material-icons-outlined primary-text">calendar_month</span>
    </div>
  </md-filled-tonal-icon-button>
</template>

<style lang="scss" scoped>
.button-set-date {
  --md-filled-tonal-icon-button-container-width: 60px;
  --md-filled-tonal-icon-button-container-height: 60px;
  --md-sys-color-secondary-container: transparent;
  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__icon {
    font-size: 36px;
  }
}
</style>
