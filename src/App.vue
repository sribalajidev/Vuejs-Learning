<script setup>
import { ref } from 'vue'
// import views 
import LoginForm from './views/LoginForm.vue';
import Home from './views/Home.vue';

const isAuthenticated = ref(false); // initial setting false

function loggedIn() {
  isAuthenticated.value = true; // update the state to true when login is successful
}
</script>

<template>
  <LoginForm v-if="!isAuthenticated" :onSuccess="loggedIn" />
  <Home v-else />
</template>

<style scoped lang="scss">

</style>
