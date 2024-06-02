export const getImageSetSummariesQuery = `
  query getImageSetSummaries($customerId: String!, $limit: Int, $nextToken: String) {
    getImageSetSummaries(customerId: $customerId, limit: $limit, nextToken: $nextToken) {
      nextToken
      image_sets {
        caption
        set_id
        state
        image_detail {
          full_height
          full_url
          full_width
          thumbs {
            xlarge
            large
            small
            medium
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`
