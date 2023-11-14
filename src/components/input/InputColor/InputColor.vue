<script setup lang="ts">
import '@material/web/radio/radio'

export interface IRadio {
  name?: string
  id?: string
  value: string
  checked: boolean
}

withDefaults(defineProps<IRadio>(), {
  name: '',
  id: ''
})

const emits = defineEmits(['update:checkedValue'])
function handleClick(event: Event): void {
  const eventTarget = event.target as HTMLInputElement
  emits('update:checkedValue', eventTarget.value)
}
</script>

<template>
  <label class="radio-color" style="position: relative">
    <input
      class="radio-color__input"
      type="radio"
      :name="name"
      :id="id"
      :value="value"
      :checked="checked"
      @input="handleClick($event)"
    />
    <span class="radio-color__fake" :style="`background-color: ${value}`"></span>
  </label>
</template>

<style lang="scss">
.radio-color {
  &__input {
    display: none;
  }
  &__fake {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
  }

  &__fake::before {
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

  &__input:checked + &__fake::before {
    width: 30px;
    height: 30px;
    opacity: 1;
  }
}
</style>
