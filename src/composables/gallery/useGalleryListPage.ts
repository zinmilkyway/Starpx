import { Image } from '@/models/images/ImagePropsType'
import { GetImageSetSummariesQueryResponseModel } from '@/models/services/gallery/ImageSetSumaryModel'
import gqlClient from '@/services/gqlClient'
import { getImageSetSummariesQuery } from '@/services/graphqlSchema/queries/getImageSetSummariesQuery'
import { getCurrentUser } from 'aws-amplify/auth'
import { onMounted, onUnmounted, ref } from 'vue'
// import { useLoading } from '@/composables/common/useLoading'

export const useGalleryListPage = () => {
  const galleryData = ref()
  const nextCursor = ref()
  const imagesExtraLarge = ref<Image[]>([])
  const images = ref<Image[]>([])
  const scale = ref(1)
  const galleryContainer = ref<HTMLElement | null>(null)
  // const { setLoading, loading } = useLoading()
  const fetchLimit = 12
  let firstCallApi = true
  const showLightbox = ref(false)
  const currentIndex = ref(0)
  const isLoading = ref(false)
  const loadingLightbox = ref(true)

  const fetchGallery = async () => {
    try {
      // setLoading(true)
      isLoading.value = true
      const client = await gqlClient()
      const user = await getCurrentUser()
      const { loginId } = user.signInDetails!
      const variables = { customerId: loginId, limit: fetchLimit, nextToken: nextCursor.value }
      const { data } = (await client.graphql<string>({
        query: getImageSetSummariesQuery,
        variables
      })) as { data: GetImageSetSummariesQueryResponseModel }

      return data
    } catch (error) {
      throw new Error('Failed to fetch')
    } finally {
      // setLoading(false)
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

  const resetLightBox = () => {
    scale.value = 0.8
    loadingLightbox.value = true
  }
  const openLightbox = (index: number) => {
    currentIndex.value = index
    showLightbox.value = true
    resetLightBox()
  }

  const closeLightbox = () => {
    showLightbox.value = false
    resetLightBox()
  }

  const zoomImage = (event: WheelEvent) => {
    event.preventDefault()
    const delta = event.deltaY > 0 ? -0.1 : 0.1
    const newScale = Math.max(0.5, scale.value + delta)
    scale.value = newScale
  }

  const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % imagesExtraLarge.value.length
    resetLightBox()
  }

  const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + imagesExtraLarge.value.length) % imagesExtraLarge.value.length
    resetLightBox()
  }

  const onLoadingLightbox = () => {
    setTimeout(() => {
      loadingLightbox.value = false
    }, 500)
  }

  // todo: use IntersectionObserver
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
    galleryContainer,
    images,
    showLightbox,
    prevImage,
    nextImage,
    currentIndex,
    openLightbox,
    closeLightbox,
    zoomImage,
    scale,
    handleScroll,
    imagesExtraLarge,
    isLoading,
    onLoadingLightbox,
    loadingLightbox
  }
}
