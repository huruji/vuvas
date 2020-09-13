import App from './App.vue'
import { createApp } from '../src/index'
// import { createApp } from '@vue/runtime-dom'
console.log('start')
createApp(App).mount(document.querySelector('#app'))

// import App from './App.vue'
// import { createApp } from '@vue/runtime-dom'

// createApp(App).mount('#app')