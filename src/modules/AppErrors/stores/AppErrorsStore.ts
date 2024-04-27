import { defineStore } from 'pinia'
import { ref } from 'vue'

interface IAppError {
  id: string
  title: string
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function generateRandomId(length: number = 8) {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export const useAppErrorsStore = defineStore('appErrorsStore', () => {
  const errors = ref<IAppError[]>([])

  const addError = (error: IAppError | string) => {
    if (typeof error === 'string') {
      const newError = { title: error, id: generateRandomId() }
      errors.value.push(newError)
      setTimeout(deleteError, 5000, newError.id)
    } else {
      errors.value.push(error)
      setTimeout(deleteError, 5000, error.id)
    }
  }

  const deleteError = (id: string) => {
    errors.value.forEach((value, index) => {
      if (value.id === id) {
        errors.value.splice(index, 1)
      }
    })
  }

  // const mocks = ['error 1', 'error 2', 'error 3', 'error 4']
  // // const mocks = []

  // function* addMockData() {
  //   for (let i = 0; i <= mocks.length; i++) {
  //     if (mocks[i]) yield addError(mocks[i])
  //   }
  // }

  // const generator = addMockData()

  // const timerId = setInterval(() => {
  //   generator.next()
  // }, 1000)

  // setTimeout(() => {
  //   clearInterval(timerId)
  // }, 10000)

  return { errors, addError, deleteError }
})
