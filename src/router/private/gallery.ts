const data = {
    path: '/gallery',
    name: 'Gallery',
    isHideMenu: true,
    nameComponent: 'Gallery',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/pages/gallery/GalleryShowCasePage.vue'),
    children: [],
    meta: {
      title: 'Gallery'
    }
  }
  
  export default data
  