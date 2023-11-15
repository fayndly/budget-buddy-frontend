<script setup lang="ts">
import '@material/web/radio/radio'

export interface IRadioColor {
  name: string
  id: string
  value: string
  checked: boolean
}

const props = defineProps<IRadioColor>()

const emit = defineEmits(['update:checkedValue'])
function updateValueHandler(event: Event): void {
  const eventTarget = event.target as HTMLInputElement
  emit('update:checkedValue', { value: eventTarget.value, id: eventTarget.id })
}
</script>

<template>
  <label class="radio-color">
    <input class="radio-color__input" type="radio" v-bind="props" @input="updateValueHandler" />
    <span class="radio-color__fake-input" :style="`background-color: ${value}`"></span>
  </label>
</template>

<style lang="scss">
.radio-color {
  position: relative;
  &__input {
    display: none;
  }
  &__fake-input {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
  }

  &__fake-input::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 50%;
    background-color: var(--md-sys-color-background);
    // border: 2px solid var(--md-sys-color-primary);

    opacity: 0;
    width: 0px;
    height: 0px;
    transition: 0.3s;
  }

  &__input:checked + &__fake-input::before {
    width: 30px;
    height: 30px;
    opacity: 1;
  }
}
</style>
