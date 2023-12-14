import { createRouter, createWebHistory } from 'vue-router'

import { PageHome } from '@/pages/PageHome'
import { PageLogin } from '@/pages/PageLogin'
import { PageSignup } from '@/pages/PageSignup'
import { PageSettings } from '@/pages/PageSettings'
import { PageAddCheck } from '@/pages/PageAddCheck'
import { PageAddCategory } from '@/pages/PageAddCategory'
import { PageNotFound } from '@/pages/PageNotFound'
import { PageAddTransaction } from '@/pages/PageAddTransaction'

import { PageMain } from '@/pages/PageMain'
import { PageMainExpense } from '@/modules/NestedRoutes/Main/PageMainExpense'
import { PageMainIncome } from '@/modules/NestedRoutes/Main/PageMainIncome'

import { PageCategories } from '@/pages/PageCategories'
import { PageCategoriesExpense } from '@/modules/NestedRoutes/Categories/PageCategoriesExpense'
import { PageCategoriesIncome } from '@/modules/NestedRoutes/Categories/PageCategoriesIncome'

import { PageChecks } from '@/pages/PageChecks'

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
      path: '/main/:checkId?',
      redirect: '/main/expense',
      name: 'Main',
      component: PageMain,
      children: [
        {
          path: 'expense',
          component: PageMainExpense,
          name: 'MainExpense'
        },
        {
          path: 'income',
          component: PageMainIncome,
          name: 'MainIncome'
        }
      ]
    },
    {
      path: '/settings',
      name: 'Settings',
      component: PageSettings
    },
    {
      path: '/addtransaction',
      name: 'AddTransaction',
      component: PageAddTransaction
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
      path: '/categories',
      name: 'Categories',
      component: PageCategories,
      redirect: '/categories/expense',
      children: [
        {
          path: 'expense',
          component: PageCategoriesExpense,
          name: 'CategoriesExpense'
        },
        {
          path: 'income',
          component: PageCategoriesIncome,
          name: 'CategoriesIncome'
        }
      ]
    },
    {
      path: '/checks',
      name: 'Checks',
      component: PageChecks
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: PageNotFound
    }
  ]
})

export default router
