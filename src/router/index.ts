import { createRouter, createWebHistory } from 'vue-router'

import { PageHome } from '@/pages/PageHome'
import { PageLogin } from '@/pages/PageLogin'
import { PageSignup } from '@/pages/PageSignup'
import { PageSettings } from '@/pages/PageSettings'
import { PageMain } from '@/pages/PageMain'
import { PageAddExpense } from '@/pages/PageAddExpense'
import { PageAddIncome } from '@/pages/PageAddIncome'
import { PageAddCheck } from '@/pages/PageAddCheck'
import { PageAddCategory } from '@/pages/PageAddCategory'
import { PageNotFound } from '@/pages/PageNotFound'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PageHome
    },
    {
      path: '/login',
      name: 'Login',
      component: PageLogin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: PageSignup
    },
    {
      path: '/main',
      name: 'Main',
      component: PageMain
    },
    {
      path: '/settings',
      name: 'Settings',
      component: PageSettings
    },
    {
      path: '/addexpense',
      name: 'AddExpense',
      component: PageAddExpense
    },
    {
      path: '/addincome',
      name: 'AddIncome',
      component: PageAddIncome
    },
    {
      path: '/addcheck',
      name: 'AddCheck',
      component: PageAddCheck
    },
    {
      path: '/addcategory',
      name: 'AddCategory',
      component: PageAddCategory
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: PageNotFound
    }
  ]
})

export default router
