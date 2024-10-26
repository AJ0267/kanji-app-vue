import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import CardComponent from './components/CardComponent.vue'

const app = createApp(App)

app.component('Card', CardComponent)

app.use(router)

app.mount('#app')
