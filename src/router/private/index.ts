import { RouteRecordRawExtends } from '@/models'

import gallery from './gallery'

// navigation list
const listLinks: RouteRecordRawExtends[] = [gallery]

export const originRouter: RouteRecordRawExtends[] = listLinks.map((item) => {
  return {
    path: item.path,
    component: item.component,
    meta: item.meta,
    redirect: item.redirect,
    children: item.children?.map((_item) => ({
      path: `${item.path}/${_item.path}`,
      component: _item.component,
      meta: _item.meta,
      redirect: _item?.redirect,
      children: _item?.children?.map((__item) => ({
        path: `${item.path}/${_item.path}/${__item.path}`,
        component: __item.component,
        meta: __item.meta,
        redirect: __item?.redirect
      }))
    }))
  }
}) as RouteRecordRawExtends[]

function flattenArray(arr: RouteRecordRawExtends[]) {
  const result: any[] = []

  function recursiveFlatten(arr: any) {
    for (const item of arr) {
      result.push({
        name: item.name ?? '',
        path: item.path ?? '',
        component: item?.component,
        meta: item?.meta,
        redirect: item?.redirect
      })
      if (item.children && Array.isArray(item.children) && item.children.length > 0) {
        recursiveFlatten(item.children)
      }
    }
  }

  recursiveFlatten(arr)
  return result
}

export const privateRoutes = flattenArray(originRouter)
