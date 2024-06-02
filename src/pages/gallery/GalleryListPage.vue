<script setup lang="ts">
import { useGalleryListPage } from '@/composables/gallery/useGalleryListPage'
// import AuthBackground from '../authentication/AuthBackground.vue';

const { scale, handleScroll, galleryContainer, images, showLightbox, prevImage, nextImage, currentIndex, openLightbox, closeLightbox, zoomImage } =
  useGalleryListPage()
</script>

<template>
  <div class="">
    <!-- <AuthBackground /> -->
    <div ref="galleryContainer" @scroll="handleScroll">
      <div class="flex p-10 justify-center items-center bg-primary min-h-screen">
        <div class="gallery flex flex-wrap items-center justify-center">
          <img
            v-if="images"
            v-for="(image, index) in images"
            :key="index"
            :src="image.src"
            alt=""
            @click="openLightbox(index)"
            class="w-1/3 h-auto m-2 cursor-pointer"
          />
          <!-- todo: add skeleton -->
          <div v-else class="skeleton"></div>
          <div v-if="images" id="load-more"></div>
        </div>
      </div>

      <div v-if="showLightbox" class="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-90 flex items-center justify-center">
        <button class="top-6 right-12 absolute text-4xl text-white z-10" @click.prevent="closeLightbox">x</button>
        <button class="left-12 z-10 text-white absolute text-4xl" @click.prevent="prevImage">&#10094;</button>
        <img
          @wheel.prevent="zoomImage"
          :src="images[currentIndex].src"
          alt=""
          class="max-w-[90%] max-h-[90%] cursor-pointer transition-all duration-300 ease-in-out"
          :style="{ transform: `scale(${scale})` }"
        />
        <button class="right-12 z-10 text-white absolute text-4xl" @click.prevent="nextImage">&#10095;</button>
      </div>
    </div>
  </div>
</template>
