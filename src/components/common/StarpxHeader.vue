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
  <div class="flex flex-row xl:gap-10 gap-2 md:gap-4 justify-center items-center xl:py-4 px-4 py-2 bg-second sticky top-0 z-10">
    <span class="text-sm xl:text-lg font-bold text-zinc-100">Welcome back, {{ username }}</span>
    <StarpxButton @click="handleSignOut" class="xl:w-28 w-24 text-sm xl:text-lg font-bold" label="Sign out" />
  </div>
</template>
