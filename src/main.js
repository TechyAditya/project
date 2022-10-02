import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import App from './App.vue'
import router from './router/index.js'
import './assets/styles.css'

const app = createApp(App)
    .use(BootstrapVue3)
    .use(router)
    
app.mount('#app')