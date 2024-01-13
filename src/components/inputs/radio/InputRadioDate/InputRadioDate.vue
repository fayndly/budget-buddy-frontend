<script setup lang="ts">
import type { IPropsRadioDate } from './types/props.types'

const props = defineProps<IPropsRadioDate>()
const emit = defineEmits(['update:modelValue'])

function updateValueHandler(): void {
  emit('update:modelValue', { date: props.date, text: props.header, id: props.id })
}

const getWithPrefixZero = (time: number): string => {
  if (time < 10) return '0' + time.toString()
  return time.toString()
}
</script>

<template>
  <label class="radio-date">
    <input
      class="radio-date__input"
      type="radio"
      required
      :checked="checked"
      :id="id"
      :value="value"
      :name="name"
      @change="updateValueHandler"
    />
    <span class="radio-date__fake-input">
      <span class="radio-date__date label-large">{{ header }}</span>
      <span class="radio-date__head label-large"
        >{{ getWithPrefixZero(date.getDate()) }}.{{ getWithPrefixZero(date.getMonth() + 1) }}</span
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
