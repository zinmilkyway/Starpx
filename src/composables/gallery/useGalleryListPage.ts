import { Image } from '@/models/images/ImagePropsType'
import { GetImageSetSummariesQueryResponseModel } from '@/models/services/gallery/ImageSetSumaryModel'
import { getImageSetSummariesQuery } from '@/services/graphqlSchema/queries/getImageSetSummariesQuery'
import { gqlService } from '@/services/services'
import { useAccountStore } from '@/store/accounts/account'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'
// import { useLoading } from '@/composables/common/useLoading'

export const useGalleryListPage = () => {
  const galleryData = ref()
  const nextCursor = ref()
  const imagesExtraLarge = ref<Image[]>([])
  const images = ref<Image[]>([])
  const galleryContainer = ref<HTMLElement | null>(null)
  const fetchLimit = 12
  let firstCallApi = true
  const showLightbox = ref(false)
  const currentIndex = ref(0)
  const isLoading = ref(false)
  const accountStore = useAccountStore()
  const { account } = storeToRefs(accountStore)

  const fetchGallery = async () => {
    try {
      isLoading.value = true
      const variables = { customerId: account.value, limit: fetchLimit, nextToken: nextCursor.value }
      const { data } = (await gqlService.query(getImageSetSummariesQuery, variables)) as { data: GetImageSetSummariesQueryResponseModel }

      return data
    } catch (error) {
      throw new Error('Failed to fetch')
    } finally {
      isLoading.value = false
    }
  }

  const handleFetchGallery = async () => {
    if (!firstCallApi && !nextCursor.value) {
      return
    } else {
      firstCallApi = false
    }
    const { getImageSetSummaries } = await fetchGallery()
    galleryData.value = getImageSetSummaries
    const newImages = getImageSetSummaries.image_sets.map((imageSet) => ({
      src: imageSet.image_detail.thumbs.medium,
      alt: imageSet.caption
    }))
    const newImagesXL = getImageSetSummaries.image_sets.map((imageSet) => ({
      src: imageSet.image_detail.thumbs.xlarge,
      alt: imageSet.caption
    }))
    images.value = [...images.value, ...newImages]
    imagesExtraLarge.value = [...imagesExtraLarge.value, ...newImagesXL]
    nextCursor.value = getImageSetSummaries?.nextToken
  }
  const openLightbox = (index: number) => {
    currentIndex.value = index
    showLightbox.value = true
  }

  const closeLightbox = () => {
    showLightbox.value = false
  }

  const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % imagesExtraLarge.value.length
  }

  const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + imagesExtraLarge.value.length) % imagesExtraLarge.value.length
  }

  const elementIsVisibleInViewport = () => {
    const el = document.getElementById('load-more')
    if (el) {
      const { top, left, bottom, right } = el.getBoundingClientRect()
      const { innerHeight, innerWidth } = window
      return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
    } else {
      return false
    }
  }
  const handleScroll = (_event: Event) => {
    if (showLightbox.value) {
      return
    }
    setTimeout(() => {
      const isEndList = elementIsVisibleInViewport()
      if (isEndList && !isLoading.value) {
        handleFetchGallery()
      }
    }, 200)
  }

  onMounted(() => {
    handleFetchGallery()
    document.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    document.removeEventListener('scroll', handleScroll)
  })

  return {
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
  }
}
