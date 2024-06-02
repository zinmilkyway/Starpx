<script setup lang="ts">
import { useLoadingProvide } from './composables/common/useLoading'
import AppLoadingComponent from '@/components/common/StarpxAppLoading.vue'
import ContentApp from './ContentApp.vue'
import { useAuthGuard } from './common/useAuthGuard'
const { loading, size } = useLoadingProvide()
useAuthGuard()
</script>
<template>
  <AppLoadingComponent :loading="loading" :size="size" />
  <ContentApp />
</template>
