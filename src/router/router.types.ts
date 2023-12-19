import type { VueElement } from 'vue'
import type { AppLayoutsEnum } from '@/layouts/layouts.types'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayoutsEnum
    layoutComponent?: VueElement
  }
}

export enum RouteNamesEnum {
  home = 'Home',
  notFound = 'NotFound',
  settings = 'Settings',

  auth = 'Auth',
  authLogin = 'AuthLogin',
  authSignup = 'AuthSignup',

  main = 'Main',
  mainExpense = 'MainExpense',
  mainIncome = 'MainIncome',

  transaction = 'Transaction',
  transactions = 'Transactions',
  transactionsAdd = 'TransactionsAdd',
  transactionsUpdate = 'TransactionsUpdate',

  category = 'Category',
  categories = 'Categories',
  categoriesExpense = 'CategoriesExpense',
  categoriesIncome = 'CategoriesIncome',
  categoriesAdd = 'CategoriesAdd',
  categoriesUpdate = 'CategoriesUpdate',

  check = 'Check',
  checks = 'Checks',
  checksAdd = 'ChecksAdd',
  checksUpdate = 'ChecksUpdate'
}
