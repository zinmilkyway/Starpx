import { UNAUTHORIZE } from '@/common/constant'
import { CommonPublicClientOptions, V6Client } from '@aws-amplify/api-graphql'
import { generateClient } from 'aws-amplify/api'
import { AuthError, fetchAuthSession } from 'aws-amplify/auth'
// import { useAuthenticator } from '@aws-amplify/ui-vue'
const gqlClient = (): Promise<V6Client> => {
  // const auth = useAuthenticator()
  return new Promise((resolve, reject) => {
    // fetchAuthSession always return valid tokens
    fetchAuthSession()
      .then((token) => {
        const clientConfig: CommonPublicClientOptions = {
          authToken: token?.tokens?.accessToken?.toString()
        }
        const client = generateClient(clientConfig)
        resolve(client)
      })
      .catch(() => {
        reject(new AuthError({ name: UNAUTHORIZE, message: 'Unauthorized' }))
      })
  })
}

export default gqlClient
