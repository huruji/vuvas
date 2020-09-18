import { createRouter, createWebHistory } from 'vue-router'

import App from './App/index.vue'
import VuvasComponents from './VuvasComps/index.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: App
    },
    {
      path: '/coms',
      component: VuvasComponents
    }
  ]
})

window.$router = router

export default router