<script setup lang="ts">
import { getCurrentUser } from 'aws-amplify/auth'
import { onMounted, ref } from 'vue'
import StarpxButton from './StarpxButton.vue'
import { useAccountStore } from '@/store/accounts/account'
const username = ref()

const { handleSignOut } = useAccountStore()
onMounted(async () => {
  const user = await getCurrentUser()
  username.value = user.signInDetails?.loginId
})
</script>

<template>
  <div class="flex flex-row gap-10 justify-center items-center py-4 bg-second sticky top-0 z-10">
    <span class="text-lg font-bold text-zinc-100">Welcome back, {{ username }}</span>
    <StarpxButton @click="handleSignOut" class="!w-28 font-bold" label="Sign out" />
  </div>
</template>
