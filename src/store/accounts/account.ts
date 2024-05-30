import { useStorage } from '@/composables/common/useStorage'
import { PROFILE_WELFARE_BO } from '@/common/constant'
import { ACCESS_TOKEN, LOGIN_STATUS, REFRESH_TOKEN, ACCOUNT_PROFILE, storage } from '@/common/storage'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AUTH_LOGIN_ROUTER } from '@/common/router'

export const useAccountStore = defineStore(ACCOUNT_PROFILE, () => {
  const router = useRouter()
  const isLogin = ref()
  // todo: define user info model
  const [account, setAccount] = useStorage<any>(PROFILE_WELFARE_BO)

  const handleSaveProfile = async () => {}

  const clearToken = () => {
    storage.remove(ACCESS_TOKEN)
    storage.remove(REFRESH_TOKEN)
    storage.remove(LOGIN_STATUS)
  }

  const clearTokenAndRedirectToLogin = () => {
    setAccount(undefined)
    isLogin.value = false
    clearToken()
    router.push(AUTH_LOGIN_ROUTER)
  }

  const logout = async () => {
    // todo: call api
    clearTokenAndRedirectToLogin()
  }

  return {
    isLogin,
    account,
    handleSaveProfile,
    logout,
    clearTokenAndRedirectToLogin,
    clearToken
  }
})
