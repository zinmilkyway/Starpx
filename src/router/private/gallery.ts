const data = {
  path: '/',
  name: 'Gallery Show Case',
  component: import(/* webpackChunkName: "user-chunk" */ '@/pages/router/WrapRouteView.vue'),
  children: [
    {
      path: '',
      name: 'Gallery Show Case',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/pages/gallery/GalleryListPage.vue'),
      children: [],
      meta: {
        title: 'Gallery Show Case'
      }
    }
  ]
}

export default data
