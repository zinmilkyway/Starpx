import '@/assets/css/app.css'
import { amplifyConfig } from '@/appConfig/amplify.config'
import '@aws-amplify/ui-vue'
import { Amplify } from 'aws-amplify'
import { createPinia } from 'pinia'
import { configure } from 'vee-validate'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

/* vee-validate config*/
configure({
  validateOnInput: true
})

app.use(createPinia())

app.use(router)

Amplify.configure(amplifyConfig)

app.mount('#app')
