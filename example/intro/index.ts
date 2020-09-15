import App from './App.vue'
import createApp from '../../src/render/index'
// import { createApp, createApp } from '@vue/runtime-dom'
console.log('start intro')
createApp(App).mount(document.querySelector('#app')!)

// import App from './App.vue'
// import { createApp } from '@vue/runtime-dom'

// createApp(App).mount('#app')