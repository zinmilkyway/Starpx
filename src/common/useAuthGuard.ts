import router from '@/router'
import { useAccountStore } from '@/store/accounts/account'
import { storeToRefs } from 'pinia'
import { AUTH_LOGIN_ROUTE, HOME_PAGE_ROUTE } from './router'

export const useAuthGuard = () => {
  const accountStore = useAccountStore()
  const { account } = storeToRefs(accountStore)

  router.beforeEach(async (to, _from, next) => {
    const isAuthenticated = !!account.value
    if (isAuthenticated && to.path !== AUTH_LOGIN_ROUTE) {
      next()
    } else if (isAuthenticated && to.path === AUTH_LOGIN_ROUTE) {
      next(HOME_PAGE_ROUTE)
    } else if (!isAuthenticated && to.path !== AUTH_LOGIN_ROUTE) {
      next(AUTH_LOGIN_ROUTE)
    } else {
      next()
    }
  })
}
