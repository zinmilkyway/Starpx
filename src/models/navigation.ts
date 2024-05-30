export interface IFavoriteNavigation {
  id?: string | number
  item: {
    name?: string
    path?: string
    nameComponent?: string
    children: {
      name?: string
      path?: string
      nameComponent?: string
      children?: IFavoriteNavigationItem
    }
  }
}

export interface IFavoriteNavigationItem {
  name?: string
  path: string
  nameComponent?: string
}
