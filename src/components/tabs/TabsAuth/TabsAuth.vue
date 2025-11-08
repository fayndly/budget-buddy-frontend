<script setup lang="ts">
type IChangeRoute = 'AuthSignup' | 'AuthLogin'
const changeRoute: {
  AuthSignup: IChangeRoute
  AuthLogin: IChangeRoute
} = {
  AuthSignup: 'AuthLogin',
  AuthLogin: 'AuthSignup'
}
const dataRoutes = {
  AuthSignup: {
    headerText: 'Зарегистрироваться'
  },
  AuthLogin: {
    headerText: 'Войти'
  }
}
</script>

<template>
  <h2 class="body-large outline-text">
    или
    <router-link
      class="surface-tint-text"
      :to="{ name: changeRoute[$route.name as IChangeRoute], replace: true }"
      >{{ dataRoutes[changeRoute[$route.name as IChangeRoute]].headerText }}</router-link
    >
  </h2>
</template>
