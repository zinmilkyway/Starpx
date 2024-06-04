import { useAccountStore } from '@/store/accounts/account'
import { GraphQLQuery } from '@aws-amplify/api'
import gqlClient from './gqlClient'
class GqlService {
  accountStore = useAccountStore()
  async query(query: GraphQLQuery<any>, variables) {
    try {
      const client = await gqlClient()
      return await client.graphql({ query, variables })
    } catch (error) {
      this.accountStore.handleSignOut()
    }
  }
}

export const gqlService = new GqlService()
