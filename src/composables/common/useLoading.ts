import { inject, provide, Ref, ref } from 'vue'

export interface ILoading {
  loading?: Ref<boolean>
  setLoading: (value: boolean) => void
  size?: 'large' | 'small'
  setSize?: (newSize: 'large' | 'small') => void
}

export const useLoadingProvide = (initialValue: boolean = false, initialSize: 'large' | 'small' = 'large') => {
  const loading = ref<boolean>(initialValue)
  const size = ref<'large' | 'small'>(initialSize)

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const setSize = (newSize: 'large' | 'small') => {
    size.value = newSize
  }

  provide('loading', { loading, setLoading, size, setSize })

  return { loading, setLoading, size, setSize }
}

export const useLoading = (initialValue: boolean = false, initialSize: 'large' | 'small' = 'large'): ILoading => {
  const { loading, setLoading, size, setSize } = inject<ILoading>('loading', { setLoading: () => {} })
  if (initialValue && setLoading) {
    setLoading(initialValue)
  }
  if (initialSize && setSize) {
    setSize(initialSize)
  }
  return { loading, setLoading, size, setSize }
}
