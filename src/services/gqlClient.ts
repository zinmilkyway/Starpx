import { AppConfig } from '@/appConfig/app.configs'
import { generateClient } from 'aws-amplify/api'
const clientConfig = {
  headers: {
    'x-api-key': AppConfig.apiKey,
    'Content-Type': 'application/json'
  }
}
const client = generateClient(clientConfig)

export default client
