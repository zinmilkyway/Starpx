export interface RouteRecordRawExtends extends RouteRecordRawChildItem {
  image?: any
  children: RouteRecordRawChild[]
}

export interface RouteRecordRawChild extends RouteRecordRawChildItem {
  path: string
  name: string
  children: RouteRecordRawChildItem[]
}

export interface RouteRecordRawChildItem {
  path: string
  redirect?: any
  name?: string
  component?: any
  id?: string | number
  idString?: string
  meta?: any
  text?: string
  children?: RouteRecordRawChildItem[]
}
