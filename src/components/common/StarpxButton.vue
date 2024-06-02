<script setup lang="ts">
import { blurElement } from '@/common/helper'

export interface ButtonProps {
  label?: string
  disabled?: boolean
}

export type ButtonEmits = (e: 'onClick', event?: Event | undefined) => void

const emit = defineEmits<ButtonEmits>()
const props = defineProps<ButtonProps>()

const eventClick = () => {
  emit('onClick')
  blurElement()
}
</script>
<template>
  <button
    v-bind="props"
    @click="eventClick"
    type="button"
    class="w-full cursor-pointer text-white bg-forth hover:bg-forth/90 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-3 py-2 focus:outline-none"
  >
    {{ label }}
  </button>
</template>
