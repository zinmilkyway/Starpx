<script setup lang="ts">
import { ref } from 'vue'
import StarpxImageLoadingSkeleton from './StarpxImageLoadingSkeleton.vue'
import { Image } from '@/models/images/ImagePropsType'

const props = defineProps<Image>()

const loading = ref(true)

const onLoad = () => {
  loading.value = false
}
</script>

<template>
  <div>
    <StarpxImageLoadingSkeleton v-if="loading" class="w-full h-[60vh] object-cover rounded-md" />
    <img :src="props.src" @load="onLoad" :alt="props.alt" class="w-full h-[60vh] object-cover rounded-md" :style="{ display: loading ? 'none' : 'block' }" />
  </div>
</template>
