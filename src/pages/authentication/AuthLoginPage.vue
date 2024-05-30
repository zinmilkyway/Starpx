<script setup lang="ts">
import { useAccountStore } from '@/store/accounts/account'

const accountStore = useAccountStore()
</script>
<template>
  <div>Login</div>
  <div>{{ accountStore }}</div>
</template>
