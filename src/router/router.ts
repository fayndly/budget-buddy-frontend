import { createRouter, createWebHistory } from 'vue-router'

import { loadLayoutMiddleware } from '@/router/middleware/loadLayout.middleware'
import { RouteNamesEnum } from '@/router/router.types'
import { AppLayoutsEnum } from '@/layouts/layouts.types'

import { PageHome } from '@/pages/PageHome'
import { PageSettings } from '@/pages/PageSettings'
import { PageNotFound } from '@/pages/PageNotFound'

import { PageMain } from '@/pages/PageMain'
import { PageMainExpense } from '@/modules/NestedRoutes/Main/PageMainExpense'
import { PageMainIncome } from '@/modules/NestedRoutes/Main/PageMainIncome'
const routesMain = [
  {
    path: '/main/:checkId?',
    redirect: (to: any) => {
      if (to.params.checkId) {
        return `/main/${to.params.checkId}/expense`
      }
      return `/main/expense`
    },
    // redirect: '/main/:checkId?/expense',
    name: RouteNamesEnum.main,
    component: PageMain,
    children: [
      {
        path: 'expense',
        component: PageMainExpense,
        name: RouteNamesEnum.mainExpense
      },
      {
        path: 'income',
        component: PageMainIncome,
        name: RouteNamesEnum.mainIncome
      }
    ]
  }
]

import { PageTransaction } from '@/pages/transactions/PageTransaction'
// import { PageTransactions } from '@/pages/transactions/PageTransactions'
import { PageTransactionAdd } from '@/pages/transactions/PageTransactionAdd'
import { PageTransactionUpdate } from '@/pages/transactions/PageTransactionUpdate'
const routesTransactions = [
  {
    path: '/transactions/:transactionId',
    name: RouteNamesEnum.transaction,
    component: PageTransaction
  },
  // {
  //   path: '/transactions',
  //   name: RouteNamesEnum.transactions,
  //   component: PageTransactions
  // },
  {
    path: '/transactions/add',
    name: RouteNamesEnum.transactionsAdd,
    component: PageTransactionAdd
  },
  {
    path: '/transactions/update/:transactionId',
    name: RouteNamesEnum.transactionsUpdate,
    component: PageTransactionUpdate
  }
]

import { PageCheck } from '@/pages/checks/PageCheck'
import { PageChecks } from '@/pages/checks/PageChecks'
import { PageCheckAdd } from '@/pages/checks/PageCheckAdd'
import { PageCheckUpdate } from '@/pages/checks/PageCheckUpdate'
const routesChecks = [
  {
    path: '/checks/:checkId',
    name: RouteNamesEnum.check,
    component: PageCheck
  },
  {
    path: '/checks',
    name: RouteNamesEnum.checks,
    component: PageChecks
  },
  {
    path: '/checks/add',
    name: RouteNamesEnum.checksAdd,
    component: PageCheckAdd
  },
  {
    path: '/checks/update/:checkId',
    name: RouteNamesEnum.checksUpdate,
    component: PageCheckUpdate
  }
]

import { PageCategories } from '@/pages/categories/PageCategories'
import { PageCategory } from '@/pages/categories/PageCategory'
import { PageCategoryAdd } from '@/pages/categories/PageCategoryAdd'
import { PageCategoryUpdate } from '@/pages/categories/PageCategoryUpdate'
import { PageCategoriesExpense } from '@/modules/NestedRoutes/Categories/PageCategoriesExpense'
import { PageCategoriesIncome } from '@/modules/NestedRoutes/Categories/PageCategoriesIncome'
const routesCategories = [
  {
    path: '/categories/:categoryId',
    name: RouteNamesEnum.category,
    component: PageCategory
  },
  {
    path: '/categories',
    name: RouteNamesEnum.categories,
    component: PageCategories,
    redirect: '/categories/expense',
    children: [
      {
        path: 'expense',
        component: PageCategoriesExpense,
        name: RouteNamesEnum.categoriesExpense
      },
      {
        path: 'income',
        component: PageCategoriesIncome,
        name: RouteNamesEnum.categoriesIncome
      }
    ]
  },
  {
    path: '/categories/add',
    name: RouteNamesEnum.categoriesAdd,
    component: PageCategoryAdd
  },
  {
    path: '/categories/update/:categoryId',
    name: RouteNamesEnum.categoriesUpdate,
    component: PageCategoryUpdate
  }
]

import { PageAuthLogin } from '@/pages/auths/PageAuthLogin'
import { PageAuthSignup } from '@/pages/auths/PageAuthSignup'
const routesAuth = [
  {
    path: '/auth',
    name: RouteNamesEnum.auth,
    redirect: '/auth/login'
  },
  {
    path: '/auth/login',
    name: RouteNamesEnum.authLogin,
    component: PageAuthLogin,
    meta: {
      layout: AppLayoutsEnum.withoutNavbar
    }
  },
  {
    path: '/auth/signup',
    name: RouteNamesEnum.authSignup,
    component: PageAuthSignup,
    meta: {
      layout: AppLayoutsEnum.withoutNavbar
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNamesEnum.home,
      component: PageHome,
      meta: {
        layout: AppLayoutsEnum.withoutNavbar
      }
    },
    ...routesMain,
    ...routesTransactions,
    ...routesChecks,
    ...routesCategories,
    ...routesAuth,
    {
      path: '/settings',
      name: RouteNamesEnum.settings,
      component: PageSettings
    },
    {
      path: '/not-founded',
      name: 'NotFounded',
      component: PageNotFound,
      meta: {
        layout: AppLayoutsEnum.withoutNavbar
      }
    },
    {
      path: '/:catchAll(.*)',
      name: RouteNamesEnum.notFound,
      component: PageNotFound,
      meta: {
        layout: AppLayoutsEnum.withoutNavbar
      }
    }
  ]
})

router.beforeEach(loadLayoutMiddleware)

export default router
