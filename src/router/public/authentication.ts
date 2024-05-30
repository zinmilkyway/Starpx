export const authRoutes = [
  {
    name: 'login',
    path: 'login',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/pages/authentication/AuthLoginPage.vue'),
    meta: {
      title: 'Login'
    }
  }
]
