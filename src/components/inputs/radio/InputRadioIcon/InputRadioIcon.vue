<script setup lang="ts">
import type { IRadioIcon } from './types/props.types'

const props = defineProps<IRadioIcon>()
const emit = defineEmits(['update:modelValue'])

const updateValueHandler = (): void => {
  emit('update:modelValue', {
    iconName: props.iconName,
    id: props.id,
    value: props.value
  })
}
</script>

<template>
  <label class="radio-icon">
    <input
      class="radio-icon__input"
      type="radio"
      :name="props.name"
      :id="props.id"
      :value="props.value"
      :checked="props.checked"
      @input="updateValueHandler"
    />
    <span
      v-if="!hasText"
      class="radio-icon__fake-input radio-icon__fake-input-icon material-icons-outlined on-background-text"
      >{{ iconName }}</span
    >
    <span
      v-else
      class="radio-icon__fake-input radio-icon__fake-input-text body-large on-background-text"
      >{{ iconName }}</span
    >
  </label>
</template>

<style lang="scss">
.radio-icon {
  position: relative;
  &__input {
    display: none;
  }
  &__fake-input {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 20px;

    transition: all 0.2s ease-in-out;
    height: 40px;
  }

  &__fake-input-icon {
    width: 40px;
    font-size: 24px;
  }

  &__fake-input-text {
    padding: 0px 10px;
    font-weight: 700;
  }

  &__input:checked + &__fake-input {
    color: var(--md-sys-color-on-primary);
    background-color: var(--md-sys-color-primary);
  }
}
</style>
