import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Pagination from 'v-pagination-3';


import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')


app.component('pagination', Pagination);