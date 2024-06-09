<script setup lang="ts">
import { Image } from '@/models/images/ImagePropsType'
import AuthBackground from '@/pages/authentication/AuthBackground.vue'
import { onMounted, ref } from 'vue'
import StarpxImageLoadingSkeleton from './StarpxImageLoadingSkeleton.vue'
export interface StarpxLightBoxProps {
  image: Image
}
export interface StarpxLightBoxEmits {
  (e: 'closeLightbox', event?: Event): void
  (e: 'nextImage', event?: Event): void
  (e: 'prevImage', event?: Event): void
}

const emits = defineEmits<StarpxLightBoxEmits>()

defineProps<StarpxLightBoxProps>()

const scale = ref(1)
const loadingLightbox = ref()
let lastTap
let touchStart

const resetLightBox = () => {
  scale.value = 1
  loadingLightbox.value = true
}

const zoomImage = (event: WheelEvent | MouseEvent) => {
  if (event.ctrlKey) {
    event.preventDefault()
    let zoomAmount
    if (event instanceof WheelEvent) {
      zoomAmount = event?.deltaY > 0 ? -0.1 : 0.1
    } else {
      zoomAmount = 0.1
    }
    const newScale = Math.max(0.5, scale.value + zoomAmount)
    scale.value = newScale
  }
}
const zoomIn = (event: MouseEvent) => {
  event.preventDefault()
  const zoomAmount = 0.1
  const newScale = Math.max(0.5, scale.value + zoomAmount)
  scale.value = newScale
}
const zoomOut = (event: MouseEvent) => {
  event.preventDefault()
  const zoomAmount = -0.1
  const newScale = Math.max(0.5, scale.value + zoomAmount)
  scale.value = newScale
}

const onLoadingLightbox = () => {
  setTimeout(() => {
    loadingLightbox.value = false
  }, 500)
}

const handleCloseLightBox = () => {
  resetLightBox()
  emits('closeLightbox')
}
const prevImage = () => {
  resetLightBox()
  emits('prevImage')
}
const nextImage = () => {
  resetLightBox()
  emits('nextImage')
}

const handleTouchStart = () => {
  touchStart = new Date().getTime()
}
const handleTouchEnd = () => {
  const currentTime = new Date().getTime()
  const tapLength = currentTime - touchStart
  if (tapLength < 500 && currentTime - lastTap < 500) {
    handleDoubleTap()
  }
  lastTap = currentTime
}
const handleDoubleTap = () => {
  const newScale = Math.max(0.5, scale.value + 0.1)
  scale.value = newScale
}

onMounted(() => {
  resetLightBox()
})
</script>

<template>
  <div class="w-full h-full overflow-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center">
    <AuthBackground />
    <div class="absolute md:right-12 md:top-12 top-4 right-6 xl:text-4xl text-2xl text-white z-30 flex flex-col gap-1">
      <button class="" @click.prevent="handleCloseLightBox">x</button>
      <button class="mt-2" @click.prevent="zoomIn">+</button>
      <button class="" @click.prevent="zoomOut">-</button>
    </div>
    <div class="flex flex-row items-center justify-center gap-2 md:gap-6 px-2 w-full">
      <button class="left-12 z-30 text-white xl:text-4xl sm:text-2xl text-xl" @click.prevent="prevImage">&#10094;</button>
      <div
        class="w-11/12 lg:w-5/6 aspect-video max-h-screen flex items-center justify-center gap-2 border-gray-600 rounded-md border-2 relative overflow-auto starpx-custom-scrollbar"
      >
        <div
          class="relative flex items-center justify-center h-full w-full"
          @dblclick.prevent="zoomImage"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <StarpxImageLoadingSkeleton class="h-full aspect-video" v-if="loadingLightbox" />
          <img
            @wheel="zoomImage"
            @load="onLoadingLightbox"
            :src="$props.image.src"
            alt=""
            class="h-full aspect-video cursor-pointer transition-all duration-300 ease-in-out rounded-sm"
            :style="{ transform: `scale(${scale})`, display: loadingLightbox ? 'none' : 'block' }"
          />
        </div>
      </div>
      <button class="right-12 z-30 text-white xl:text-4xl sm:text-2xl text-xl" @click.prevent="nextImage">&#10095;</button>
    </div>
  </div>
</template>

<style>
.starpx-custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.starpx-custom-scrollbar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0 white;
  background-color: white;
}

.starpx-custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
