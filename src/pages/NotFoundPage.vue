<script setup lang="ts">
import { HOME_PAGE_ROUTE } from '@/common/router'
import StarpxButton from '@/components/common/StarpxButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const backToHomePage = () => {
  router.push(HOME_PAGE_ROUTE)
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen gap-4 bg-slate-200">
    <span>Page not found!</span>
    <StarpxButton @click="backToHomePage" label="Back to Home" class="w-56"/>
  </div>
</template>
