import { defineStore } from 'pinia'
import { ref } from 'vue'

import { authApi } from '@/utils/API'

import { useRouter } from 'vue-router'

import { useChecksStore } from '@/stores/API/checks'
import { useCurrenciesStore } from '@/stores/API/currencies'
import { useCategoriesStore } from '@/stores/API/categories'

import { useBarCheckStore } from '@/modules/BarCheck'

import { useMonthStore } from '@/modules/ChoseMonth'

import { useMainExpenseStore } from '@/modules/NestedRoutes/Main/PageMainExpense'
import { useMainIncomeStore } from '@/modules/NestedRoutes/Main/PageMainIncome'

export const useUserAuthStore = defineStore('userAuth', () => {
  const checksStore = useChecksStore()
  const currenciesStore = useCurrenciesStore()
  const categoriesStore = useCategoriesStore()

  const barCheckStore = useBarCheckStore()

  const monthStore = useMonthStore()

  const mainExpenseStore = useMainExpenseStore()
  const mainIncomeStore = useMainIncomeStore()

  const router = useRouter()
  const isUserAuth = ref<boolean>(false)

  const isLoading = ref<boolean>(false)

  const setUserAuth = async (status: boolean) => {
    isUserAuth.value = status

    if (status) {
      await checksStore.uploadChecks()
      await currenciesStore.uploadCurrencies()
      await categoriesStore.uploadCategories()
    } else {
      localStorage.removeItem('token')
      barCheckStore.$reset()

      mainExpenseStore.$reset()
      mainIncomeStore.$reset()

      checksStore.$reset()
      currenciesStore.$reset()
      categoriesStore.$reset()

      monthStore.$reset()
    }
  }

  const checkUserAuth = async () => {
    isLoading.value = true
    try {
      if (!localStorage.getItem('token')) {
        isUserAuth.value = false
        isLoading.value = false
        router.replace({ name: 'Auth' })

        return
      }

      const { data } = await authApi.checkMe()

      isUserAuth.value = true

      console.log(data)
    } catch (err) {
      isUserAuth.value = false
      router.replace({ name: 'Auth' })
      console.log(err)
    } finally {
      isLoading.value = false
    }
  }

  return { isUserAuth, isLoading, checkUserAuth, setUserAuth }
})
