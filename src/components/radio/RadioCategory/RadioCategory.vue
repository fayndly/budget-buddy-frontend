<script setup lang="ts">
import '@material/web/radio/radio'

export interface IRadioCategory {
  name: string
  id: string
  value: string
  checked: boolean
  icon: string | undefined
  color: string
}

const props = defineProps<IRadioCategory>()

const emit = defineEmits(['update:checkedValue'])
function updateValueHandler(event: Event): void {
  const eventTarget = event.target as HTMLInputElement
  emit('update:checkedValue', { value: eventTarget.value, id: eventTarget.id })
}
</script>

<template>
  <label class="radio-category">
    <input class="radio-category__input" type="radio" v-bind="props" @input="updateValueHandler" />
    <span class="radio-category__fake-input" :style="`background-color: ${color}`">
      <span v-if="icon" class="radio-category__icon material-icons-outlined">{{ icon }}</span>
      <span class="radio-category__text label-large">{{ value }}</span>
    </span>
  </label>
</template>

<style lang="scss">
.radio-category {
  position: relative;
  &__input {
    display: none;
  }
  &__fake-input {
    align-items: center;
    display: flex;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 30px;
    min-height: 40px;
    position: relative;
  }

  &__icon {
    color: white;
    font-size: 18px;
  }
  &__text {
    color: white;
  }

  &__fake-input::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 30px;
    border: solid 2px var(--md-sys-color-primary);
    // border: 2px solid var(--md-sys-color-primary);

    opacity: 0;
    width: 100%;
    height: 100%;
    transition: 0.3s;
  }

  &__input:checked + &__fake-input::before {
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    opacity: 1;
  }
}
</style>
