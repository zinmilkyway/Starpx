// src/types.ts

export interface ThumbModel {
  xlarge: string
  large: string
  medium: string
  small: string
  __typename: string
}

export interface ImageDetailModel {
  full_height: number
  full_url: string
  full_width: number
  thumbs: ThumbModel
  __typename: string
}

export interface ImageSetModel {
  caption: string
  set_id: string
  state: string
  image_detail: ImageDetailModel
  __typename: string
}

export interface ImageSetSummariesModel {
  nextToken: string | null
  image_sets: ImageSetModel[]
  __typename: string
}

export interface GetImageSetSummariesQueryVariablesModel {
  customerId: string
  limit?: number
  nextToken?: string
}

export interface GetImageSetSummariesQueryResponseModel {
  getImageSetSummaries: ImageSetSummariesModel
}
