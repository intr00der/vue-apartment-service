import {createApp} from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'

const app = createApp(App).use(store).use(router)
app.mount('#app')
app.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/'

