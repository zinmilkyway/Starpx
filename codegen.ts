import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    {
      // process.env.VITE_API_URL: {
      'https://api-dev.starpx.com/graphql': {
        headers: {
          'x-api-key': ''
        }
      }
    }
  ],
  documents: ['src/**/*.vue'],
  ignoreNoDocuments: true,
  generates: {
    './src/services/graphqlSchema/': {
      plugins: ['typescript-type-graphql'],
      preset: 'client',
      config: {
        useTypeImports: true
      }
    }
  }
}

export default config
