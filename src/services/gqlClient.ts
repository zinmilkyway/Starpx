import { generateClient } from 'aws-amplify/api'
const clientConfig = {}
const client = generateClient(clientConfig)

export default client
