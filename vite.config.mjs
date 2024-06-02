import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  // get port config from environments
  const port = parseInt(env.VITE_PORT) ?? 1234
  const isExposeHost = env.VITE_IS_EXPOSE_HOST === 'true'

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser' // ensures browser compatible version of AWS JS SDK is used
      }
    },
    server: {
      port: port,
      host: isExposeHost
    },
    preview: {
      port: port,
      host: isExposeHost
    },
    build: {
      chunkSizeWarningLimit: 1600
    },
    chainWebpack: (config) => {
      config.module
        .rule('graphql')
        .test(/\.graphql$/)
        .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
    }
  }
})
