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
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/pages/router/MainTemplateRouteView.vue'),
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
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/pages/NotFoundPage.vue'),
      meta: {
        isNotRequiresAuth: true
      }
    }
  ]
})
export default router
