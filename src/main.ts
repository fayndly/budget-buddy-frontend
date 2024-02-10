import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router'

const app = createApp(App)

router.beforeEach((to, from) => {
  if (!localStorage.getItem('token') && to.name !== 'AuthLogin') {
    return { name: 'AuthLogin' }
  }
})

app.use(createPinia())
app.use(router)

app.mount('#app')
