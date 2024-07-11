import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'all',
      component: MainView
    },
    {
      path: '/active',
      name: 'active',
      component: MainView
    },
    {
      path: '/completed',
      name: 'completed',
      component: MainView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
