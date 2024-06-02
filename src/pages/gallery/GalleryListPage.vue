<script setup lang="ts">
import StarpxImageLoader from '@/components/common/StarpxImageLoader.vue'
import StarpxImageLoadingSkeleton from '@/components/common/StarpxImageLoadingSkeleton.vue'
import { useGalleryListPage } from '@/composables/gallery/useGalleryListPage'
import AuthBackground from '../authentication/AuthBackground.vue'

const {
  scale,
  handleScroll,
  galleryContainer,
  images,
  imagesExtraLarge,
  showLightbox,
  prevImage,
  nextImage,
  currentIndex,
  openLightbox,
  closeLightbox,
  zoomImage,
  isLoading,
  onLoadingLightbox,
  loadingLightbox
} = useGalleryListPage()
</script>

<template>
  <div class="bg-primary">
    <div ref="galleryContainer" @scroll="handleScroll">
      <div class="flex p-12 justify-center items-center min-h-screen flex-col">
        <div class="gallery flex flex-wrap items-center justify-center w-full h-full" v-if="images.length > 0">
          <div class="w-5/12 h-[60vh] m-2 cursor-pointer" v-for="(image, index) in images" :key="index">
            <StarpxImageLoader class="w-full h-full" @click="openLightbox(index)" :src="image.src" />
          </div>
          <div v-if="images" id="load-more" class="w-full h-full"></div>
        </div>

        <div v-if="isLoading" class="gallery flex flex-wrap items-center justify-center w-full h-full z-0 relative">
          <div class="w-5/12 h-[60vh] m-2" v-for="i in 6" :key="i">
            <StarpxImageLoadingSkeleton class="w-full h-full" />
          </div>
          <div v-if="images" id="load-more"></div>
        </div>
      </div>

      <div v-if="showLightbox" class="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-90 flex items-center justify-center z-20">
        <AuthBackground />
        <button class="top-6 right-12 absolute text-4xl text-white z-30" @click.prevent="closeLightbox">x</button>
        <button class="left-12 z-30 text-white absolute text-4xl" @click.prevent="prevImage">&#10094;</button>
        <div class="flex items-center justify-center">
          <StarpxImageLoadingSkeleton class="w-32 h-32" v-if="loadingLightbox" />
          <img
            @wheel.prevent="zoomImage"
            @load="onLoadingLightbox"
            :src="imagesExtraLarge[currentIndex].src"
            alt=""
            class="h-11/12 w-auto cursor-pointer transition-all duration-300 ease-in-out rounded-sm"
            :style="{ transform: `scale(${scale})`, display: loadingLightbox ? 'none' : 'block' }"
          />
        </div>
        <button class="right-12 z-30 text-white absolute text-4xl" @click.prevent="nextImage">&#10095;</button>
      </div>
    </div>
  </div>
</template>
