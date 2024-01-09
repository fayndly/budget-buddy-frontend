<script setup lang="ts">
import { computed } from 'vue'

import type { IPropsRadioDate } from './types/props'

const props = defineProps<IPropsRadioDate>()

const emit = defineEmits(['update:modelValue'])
function updateValueHandler(): void {
  emit('update:modelValue', props.value)
}

const isChecked = computed(() => {
  return props.checkedValue?.id === props.value?.id
})
</script>

<template>
  <label class="radio-date">
    <input
      class="radio-date__input"
      type="radio"
      :name="name"
      :value="value"
      :id="id"
      :checked="isChecked"
      @change="updateValueHandler"
    />
    <span class="radio-date__fake-input">
      <span class="radio-date__date label-large">{{ header }}</span>
      <span class="radio-date__head label-large"
        >{{ date.getDate() }}.{{ date.getMonth() + 1 }}</span
      >
    </span>
  </label>
</template>

<style lang="scss">
.radio-date {
  &__input {
    display: none;
  }
  &__fake-input {
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    gap: 8px;
    border-radius: 20px;
    border: solid 2px var(--md-sys-color-outline);
  }

  &__head,
  &__date {
    color: var(--md-sys-color-primary);
    font-weight: 700;
    transition: all 0.2s ease-in-out;
  }

  &__input:checked + &__fake-input {
    border: solid 2px transparent;
    background-color: var(--md-sys-color-primary);
    .radio-date__head {
      color: var(--md-sys-color-on-primary);
    }
    .radio-date__date {
      color: var(--md-sys-color-on-primary);
    }
  }
}
</style>
