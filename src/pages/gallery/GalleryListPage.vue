<script setup lang="ts">
import StarpxLightBox from '@/components/common/StarpxLightBox.vue'
import StarpxImageLoader from '@/components/common/StarpxImageLoader.vue'
import StarpxImageLoadingSkeleton from '@/components/common/StarpxImageLoadingSkeleton.vue'
import { useGalleryListPage } from '@/composables/gallery/useGalleryListPage'

const {
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
  isLoading
} = useGalleryListPage()
</script>

<template>
  <div class="bg-primary">
    <div ref="galleryContainer " @scroll="handleScroll">
      <div class="flex 2xl:p-12 xl:p-6 sm:p-4 justify-center items-center min-h-screen flex-col">
        <div class="gallery flex flex-wrap items-center justify-center w-full h-full mb-2" v-if="images.length > 0">
          <div class="2xl:w-5/12 xl:w-5/6 w-11/12 aspect-video p-1 md:p-2 cursor-pointer" v-for="(image, index) in images" :key="index">
            <StarpxImageLoader class="w-full h-full" @click="openLightbox(index)" :src="image.src" />
          </div>
          <div v-if="images" id="load-more" class="w-full h-full"></div>
        </div>

        <div v-if="isLoading" class="gallery flex flex-wrap items-center justify-center w-full h-full z-0 relative">
          <div class="2xl:w-5/12 xl:w-5/6 w-11/12 p-2 aspect-video" v-for="i in 6" :key="i">
            <StarpxImageLoadingSkeleton class="w-full h-full" />
          </div>
          <div v-if="images" id="load-more"></div>
        </div>
      </div>

      <div v-if="showLightbox">
        <StarpxLightBox :image="imagesExtraLarge[currentIndex]" @next-image="nextImage" @prev-image="prevImage" @close-lightbox="closeLightbox" />
      </div>
    </div>
  </div>
</template>
