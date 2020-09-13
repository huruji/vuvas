import App from './App.vue'
import createApp from './render/index.ts'

console.log('start')
createApp(App).mount(document.querySelector('#app'))