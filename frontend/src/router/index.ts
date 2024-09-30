import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DefaultLayout',
      component: DefaultLayout,
      children: [{
        path: '',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
      }, {
        path: 'customers',
        name: 'Customers',
        component: () => import('../views/CustomersView.vue')
      }, {
        path: 'customers/registration',
        name: 'registration',
        component: () => import('../views/CustomerRegistrationView.vue')
      }]
    }
  ]
})

export default router
