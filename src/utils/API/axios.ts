import axios from 'axios'
import type { AxiosInstance } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST + ':' + import.meta.env.VITE_API_PORT
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

class ApiInstance {
  public instance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.instance = instance
  }
}

export { instance, ApiInstance }
