<script setup lang="ts">
const changeRoute = {
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
      :to="{ name: changeRoute[$route.name], replace: true }"
      >{{ dataRoutes[changeRoute[$route.name]].headerText }}</router-link
    >
  </h2>
</template>
