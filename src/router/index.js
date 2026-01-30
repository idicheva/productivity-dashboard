import { createRouter, createWebHistory } from 'vue-router'
import ProductivityDashboardView from '../views/ProductivityDashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: ProductivityDashboardView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
