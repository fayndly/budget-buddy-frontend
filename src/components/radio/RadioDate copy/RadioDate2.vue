<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['value', 'id', 'name', 'date', 'header', 'data'])
const emits = defineEmits(['update:modelValue'])

const newvalue = ref({
  date: '12-12-1212',
  text: 'Сегодня',
  id: 'today'
})

function handleClick(): void {
  console.log(newvalue.value)
  emits('update:modelValue', newvalue.value)
}
</script>

<template>
  <label class="radio-date">
    <input
      class="radio-date__input"
      type="radio"
      :name="name"
      :id="id"
      :value="value"
      v-model="newvalue"
      @change="handleClick"
    />
    <span class="radio-date__fake-input">
      <span class="radio-date__date label-large">{{ header }}</span>
      <!-- <span class="radio-date__head label-large">{{ date.getDate() }}.{{ date.getMonth() }}</span> -->
      <span class="radio-date__head label-large">{{ date }}</span>
    </span>
  </label>
</template>

<style lang="scss">
.radio-date {
  &__input {
    // display: none;
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
