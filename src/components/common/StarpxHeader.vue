<script setup lang="ts">
import { useAccountStore } from '@/store/accounts/account'
import StarpxButton from './StarpxButton.vue'

const { account, handleSignOut } = useAccountStore()
</script>

<template>
  <div class="flex flex-row xl:gap-10 gap-2 md:gap-4 justify-center items-center xl:py-4 px-4 py-2 bg-second sticky top-0 z-10">
    <span class="text-xs xl:text-lg font-bold text-zinc-100">Welcome back, {{ account }}</span>
    <StarpxButton @click="handleSignOut" class="!w-28 text-xs xl:text-lg font-bold" label="Sign out" />
  </div>
</template>
