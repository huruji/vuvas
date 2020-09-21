import { createRouter, createWebHistory } from 'vue-router'

import Animation from './Animation/index.vue'
import App from './App/index.vue'
import Style from './Style/index.vue'
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
    },
    {
      path: '/style',
      component: Style
    },
    {
      path: '/animation',
      component: Animation
    }
  ]
})

window.$router = router

export default router