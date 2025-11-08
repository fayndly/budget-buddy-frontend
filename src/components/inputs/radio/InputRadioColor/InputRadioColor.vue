<script setup lang="ts">
import type { IPropsRadioColor } from './types/props.types'

const props = defineProps<IPropsRadioColor>()
const emit = defineEmits(['update:modelValue'])

function updateValueHandler(): void {
  emit('update:modelValue', { value: props.value, id: props.id })
}
</script>

<template>
  <label class="radio-color">
    <input
      class="radio-color__input"
      type="radio"
      required
      :id="id"
      :value="value"
      :name="name"
      :checked="checked"
      @change="updateValueHandler"
    />
    <span
      class="radio-color__fake-input"
      :style="{ 'background-color': value || 'transparent' }"
    ></span>
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
