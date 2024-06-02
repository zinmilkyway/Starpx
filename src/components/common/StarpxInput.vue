<script setup lang="ts">
import { ref } from 'vue'

export interface InputProps {
  placeholder?: string
  type?: string
  disabled?: boolean
  modelValue?: string
  icon?: any
}

export interface InputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'clickIconRight', event: Event): void
}

const props = defineProps<InputProps>()
const emits = defineEmits<InputEmits>()

const currentPlaceholder = ref(props.placeholder)
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emits('update:modelValue', target.value)
}
const isFocused = ref(false)

const onBlur = () => {
  isFocused.value = false
  currentPlaceholder.value = props.placeholder
}

const onFocus = () => {
  isFocused.value = true
  currentPlaceholder.value = ''
}
</script>
<template>
  <div class="flex flex-row relative">
    <input
      class="w-full h-8 px-2 py-1 rounded-sm focus:outline-none focus:bg-slate-50"
      :type="type"
      :placeholder="currentPlaceholder"
      :value="props.modelValue"
      @input="handleInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div class="absolute right-2 top-1.5 cursor-pointer z-10">
      <button
        type="button"
        @click="
          (event) => {
            $emit('clickIconRight', event)
          }
        "
      >
        <slot name="icon">
          <component :is="$props.icon" v-if="$props.icon" class="wf-icon-input-text wf-pointer" />
        </slot>
      </button>
    </div>
  </div>
</template>
