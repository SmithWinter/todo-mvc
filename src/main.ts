import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

const options = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 10,
  newestOnTop: true
}

app.use(pinia)
app.use(router)
app.use(Toast, options)
app.mount('#app')
