import { RouteRecordRawExtends } from '@/models'

import main from './main'
import gallery from './gallery'

// navigation list
const listLinks: RouteRecordRawExtends[] = [main, gallery]

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
        tooltipElement: item?.tooltipElement ?? '',
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

export const listRouteForwardPath = listLinks
  .filter((item) => !item?.isHideMenu)
  .map((item) => {
    return {
      path: item.path,
      name: item.name,
      image: item.image,
      id: item.id,
      nameComponent: item?.nameComponent,
      children:
        item?.children
          ?.filter((_item) => !_item?.isHideMenu)
          .map((_item) => ({
            path: `${item.path}/${_item.path}`,
            name: _item.name,
            nameComponent: _item?.nameComponent,
            id: _item.id,
            tooltipElement: _item?.tooltipElement ?? '',
            children: _item?.children
              ?.filter((__item) => !__item?.isHideMenu)
              .map((__item) => ({
                path: `${item.path}/${_item.path}/${__item.path}`,
                id: __item.id,
                name: __item.name,
                nameComponent: __item?.nameComponent,
                tooltipElement: __item?.tooltipElement ?? ''
              }))
          })) ?? []
    }
  })

export const listRouteForwardPathHeaderLink = listLinks.map((item) => {
  return {
    path: item.path,
    name: item.name,
    image: item.image,
    id: item.id,
    nameComponent: item?.nameComponent,
    children:
      item?.children?.map((_item) => ({
        path: `${item.path}/${_item.path}`,
        name: _item.name,
        nameComponent: _item?.nameComponent,
        id: `${item.id}-${_item.id}`,
        isShowTips: _item?.isShowTips ?? false,
        tooltipElement: _item?.tooltipElement ?? '',
        children: _item?.children?.map((__item) => ({
          tooltipElement: __item?.tooltipElement ?? '',
          path: `${item.path}/${_item.path}/${__item.path}`,
          id: `${item.id}-${_item.id}-${__item.id}`,
          name: __item.name,
          nameComponent: __item?.nameComponent,
          isShowTips: __item?.isShowTips ?? false
        }))
      })) ?? []
  }
})

function flattenArrayForwardPath(arr: RouteRecordRawExtends[]) {
  const result: any[] = []
  function recursiveFlatten(arr: any[]) {
    for (const item of arr) {
      result.push({
        name: item.name ?? '',
        path: item.path ?? '',
        nameComponent: item.nameComponent,
        id: item?.id,
        isShowTips: item?.isShowTips ?? false,
        tooltipElement: item?.tooltipElement ?? ''
      })
      if (item.children && Array.isArray(item.children) && item.children.length > 0) {
        recursiveFlatten(item.children)
      }
    }
  }

  recursiveFlatten(arr)
  return result
}

export const listRouteForwardPathFlat = flattenArrayForwardPath(listRouteForwardPathHeaderLink)

export const privateRoutes = flattenArray(originRouter)
