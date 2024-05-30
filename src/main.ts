import '@/assets/css/app.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { configure } from 'vee-validate'
import App from './App.vue'
import router from './router'

const app = createApp(App)

/* vee-validate config*/
configure({
  validateOnInput: true
})

app.use(createPinia())

app.use(router)

app.mount('#app')
