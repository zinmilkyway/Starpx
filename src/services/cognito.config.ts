import { ResourcesConfig } from 'aws-amplify'
import { AppConfig } from '@/common/configs'

export const cognitoConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: AppConfig.userPoolId,
      userPoolClientId: AppConfig.userPoolClientId
    }
  }
}
