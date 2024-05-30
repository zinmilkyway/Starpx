import { WrapRouteView } from '@/pages/router'
import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './public'
import { privateRoutes } from './private'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: '',
      path: '/',
      children: privateRoutes
    },

    {
      name: 'auth',
      path: '/auth',
      component: WrapRouteView,
      children: authRoutes,
      meta: {
        isNotRequiresAuth: true
      }
    }
  ]
})
export default router
