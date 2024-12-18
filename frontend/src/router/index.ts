import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default-layout',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'customers',
          name: 'customers',
          component: () => import('../views/Customers/IndexView.vue'),
        },
        {
          path: 'customers/registration',
          name: 'customer-registration',
          component: () => import('../views/Customers/RegistrationView.vue')
        },
        {
          path: 'customers/:id',
          name: 'customer',
          component: () => import('../views/Customers/[id]/CustomerView.vue')
        },
      ]
    }
  ]
})

export default router
