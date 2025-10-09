<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const props = defineProps(['onSuccess']); // function passed from parent component

  const email = ref('');
  const password = ref('');
  const loginError = ref('');

  // If user is already logged in in sessionStorage, call onSuccess immediately
  onMounted(() => {
    const user = sessionStorage.getItem('loggedInUser')
    if (user) props.onSuccess()
  })

  // Simple login function checking against JSON
  async function onLogin() {
    loginError.value = ''
    try {
      const { data: users } = await axios.get('https://fakestoreapi.com/users')
      const user = users.find(u => u.email === email.value && u.password === password.value)
      if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user)) // store user in session
        props.onSuccess()  // call parent callback on success
      } else {
        loginError.value = "Invalid email or password"
      }
    } catch {
      loginError.value = "Error fetching users"
    }
  }
</script>

<template>
  <div class="login-wrapper">
    <h1>Welcome Back</h1>
    <p>Login to continue</p>
    <p v-if="loginError" class="error-msg">{{ loginError }}</p>
    <form @submit.prevent="onLogin" class="form-wrapper">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="text" v-model="email" :class="['form-input', { error: emailError }]" @input="emailValidate" autocomplete="off" />
        <span v-if="emailError" class="error-msg">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" class="form-input" />
      </div>
      <button class="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
  .login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    min-height: 600px;
    background: var(--gray-light);
    @include media-breakpoint-down($md) {
      padding: 20px;
    }
    .error-msg {
      font-size: 14px;
      color: var(--red);
    }
    .form-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 40px;
      width: 100%;
      max-width: 450px;
      .form-group {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        .form-input {
          padding: 15px 12px;
          font-size: 16px;
          border: 1px solid;
          &:focus {
            box-shadow: none;
            outline: none;
          }
          &.error {
            border-color: var(--red);
          }
        }
        .error-msg {
          position: absolute;
          bottom: -25px;
        }
      }
    }
  }
</style>