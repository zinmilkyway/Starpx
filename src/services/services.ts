import { useAccountStore } from '@/store/accounts/account'
import { GraphQLQuery } from '@aws-amplify/api'
import gqlClient from './gqlClient'
class GqlService {
  accountStore = useAccountStore()
  async query(query: GraphQLQuery<any>, variables) {
    try {
      const client = await gqlClient()
      return await client.graphql({ query, variables })
    } catch (err: any) {
      if (err.errors && err.errors[0]) {
        const errorCode = err.errors[0].message
        if (errorCode === 'Unauthorized' || errorCode === 'TokenExpiredException') {
          this.accountStore.handleSignOut()
        } else {
          // console.log('Other GraphQL Error:', err.errors[0])
        }
      } else {
        this.accountStore.handleSignOut()
      }
    }
  }
}

export const gqlService = new GqlService()
