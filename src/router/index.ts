import { createRouter, createWebHistory } from 'vue-router'

import { PageLogin } from '@/pages/PageLogin'
import { PageSignup } from '@/pages/PageSignup'
import { PageSettings } from '@/pages/PageSettings'
import { PageAddExpense } from '@/pages/PageAddExpense'
import { PageAddIncome } from '@/pages/PageAddIncome'
import { PageAddCheck } from '@/pages/PageAddCheck'
import { PageAddCategory } from '@/pages/PageAddCategory'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: PageLogin
    },
    {
      path: '/signup',
      name: 'signup',
      component: PageSignup
    },
    {
      path: '/settings',
      name: 'settings',
      component: PageSettings
    },
    {
      path: '/addexpense',
      name: 'addexpense',
      component: PageAddExpense
    },
    {
      path: '/addincome',
      name: 'addincome',
      component: PageAddIncome
    },
    {
      path: '/addcheck',
      name: 'addcheck',
      component: PageAddCheck
    },
    {
      path: '/addcategory',
      name: 'addcategory',
      component: PageAddCategory
    }
  ]
})

export default router
