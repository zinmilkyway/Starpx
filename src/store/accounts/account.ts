import { USER_PROFILE } from '@/common/constant'
import { AUTH_LOGIN_ROUTE, HOME_PAGE_ROUTE } from '@/common/router'
import { ACCOUNT_PROFILE } from '@/common/storage'
import { useLoading } from '@/composables/common/useLoading'
import { useStorage } from '@/composables/common/useStorage'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import { AuthError, SignInInput } from 'aws-amplify/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signIn } from 'aws-amplify/auth'

export const useAccountStore = defineStore(ACCOUNT_PROFILE, () => {
  const isLogin = ref()
  // todo: define user info model
  const [account, setAccount] = useStorage<any>(USER_PROFILE)

  const auth = useAuthenticator()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      setAccount('')
      router.push(AUTH_LOGIN_ROUTE)
    } catch (error) {}
  }

  const handleSignIn = async (account: SignInInput) => {
    try {
      await signIn({
        username: account.username,
        password: account.password
      })
      setAccount(account.username)
      router.push(HOME_PAGE_ROUTE)
    } catch {
      router.push(AUTH_LOGIN_ROUTE)
      throw new AuthError({ name: 'Unauthorized', message: 'Unauthorized' })
    }
  }

  return {
    isLogin,
    handleSignOut,
    account,
    setAccount,
    handleSignIn
  }
})
