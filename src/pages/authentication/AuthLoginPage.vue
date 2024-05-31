<script setup lang="ts">
import { Authenticator } from '@aws-amplify/ui-vue'
// todo: remove @aws-amplify/ui-vue/styles.css and custom ui
import '@aws-amplify/ui-vue/styles.css'
</script>
<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
      <!-- Other content from before-->
    </template>
  </authenticator>
</template>
