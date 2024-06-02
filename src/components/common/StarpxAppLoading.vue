<script setup lang="ts">
import IconLogo from '@/components/icon/IconLogo.vue'
type LoadingProps = {
  loading?: boolean
  size?: 'large' | 'small'
}

withDefaults(defineProps<LoadingProps>(), {
  loading: false,
  size: 'large'
})
</script>

<template>
  <div v-show="$props.loading" class="fixed top-0 left-0 bottom-0 right-0 z-50 bg-forth bg-opacity-20 flex justify-center items-center">
    <IconLogo :width="$props.size === 'large' ? 80 : 60" class="animate-pulse-fast" alt="loading" />
  </div>
</template>
