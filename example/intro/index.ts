import App from './Home.vue'
import { createApp } from 'vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
