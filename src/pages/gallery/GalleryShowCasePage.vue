<script setup lang="ts">
import { ref } from 'vue'
// import { getImageSetSummariesQuery } from '@/services/graphqlSchema/queries/getImageSetSummariesQuery.gql'
import client from '@/services/gqlClient'

const data = ref()

const fetchImageSetSummaries = async () => {
  try {
    const getImageSetSummariesQuery = `
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
    const response: any = await client.graphql({
      query: getImageSetSummariesQuery
    })
    data.value = response
  } catch (error) {
    console.error('Error fetching image set summaries:', error)
  }
}
</script>

<template>
  <div>
    <button @click="fetchImageSetSummaries">Fetch Image Set Summaries</button>
    <pre v-if="data">{{ data }}</pre>
  </div>
</template>
