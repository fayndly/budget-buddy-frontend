import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST + ':' + import.meta.env.VITE_API_PORT
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

export default instance
