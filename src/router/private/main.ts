const data = {
  path: '',
  name: 'Dashboard',
  isHideMenu: true,
  nameComponent: 'Dashboard',
  component: () => import(/* webpackChunkName: "user-chunk" */ '@/pages/main/DashBoardPage.vue'),
  children: [],
  meta: {
    title: 'Dashboard'
  }
}

export default data
