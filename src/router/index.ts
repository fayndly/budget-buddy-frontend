import { createRouter, createWebHistory } from 'vue-router'

import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage
    }
  ]
})

export default router
