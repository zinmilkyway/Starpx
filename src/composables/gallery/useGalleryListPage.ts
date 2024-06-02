import { useLoading } from '@/composables/common/useLoading'
import { GetImageSetSummariesQueryResponseModel } from '@/models/services/gallery/ImageSetSumaryModel'
import gqlClient from '@/services/gqlClient'
import { getImageSetSummariesQuery } from '@/services/graphqlSchema/queries/getImageSetSummariesQuery'
import { getCurrentUser } from 'aws-amplify/auth'
import { onMounted, onUnmounted, ref } from 'vue'
interface Image {
  src: string
  alt: string
}
export const useGalleryListPage = () => {
  const galleryData = ref()
  const nextCursor = ref()
  const images = ref<Image[]>([])
  const scale = ref(1)
  const galleryContainer = ref<HTMLElement | null>(null)
  const { setLoading, loading } = useLoading()
  const fetchLimit = 12
  let firstCallApi = true
  const showLightbox = ref(false)
  const currentIndex = ref(0)

  const fetchGallery = async () => {
    try {
      setLoading(true)
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
      setLoading(false)
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
      src: imageSet.image_detail.thumbs.xlarge,
      alt: imageSet.caption
    }))
    images.value = [...images.value, ...newImages]
    nextCursor.value = getImageSetSummaries?.nextToken
  }

  const openLightbox = (index: number) => {
    currentIndex.value = index
    showLightbox.value = true
  }

  const closeLightbox = () => {
    showLightbox.value = false
  }

  const zoomImage = (event: WheelEvent) => {
    event.preventDefault()
    const delta = event.deltaY > 0 ? -0.1 : 0.1
    const newScale = Math.max(0.5, scale.value + delta)
    scale.value = newScale
  }

  const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length
  }

  const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
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
    setTimeout(() => {
      const isEndList = elementIsVisibleInViewport()
      if (isEndList && !loading?.value) {
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
    handleScroll
  }
}
