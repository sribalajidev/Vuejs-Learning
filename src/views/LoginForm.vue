<script setup>
  import { ref } from 'vue';

  const props = defineProps(['onSuccess']); // function passed from parent component

  const email = ref('');
  const password = ref('');
  const emailError = ref('');
  const loginError = ref('');

  // store credentials in one object
  const storedCredentials = {
    email: 'user@mail.com',
    password: 'password'
  }

  function emailValidate() {
    emailError.value = '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // email validation
    if(!email.value) {
      emailError.value = 'Email is required';
      return;
    } else if(!emailRegex.test(email.value)) {
      emailError.value = 'Enter a valid email';
      return;
    }
  }

  function onLogin() {
    // Resets login error message
    loginError.value = '';

    // check email validation
    if(emailError.value) return;

    // check credentials match - In a real-world scenario, the API call replaces the stored credentials check
    if(email.value == storedCredentials.email && password.value == storedCredentials.password) {
      props.onSuccess(); // call the function passed from parent component to update login state - works like Callback Props in React
    }
    else {
      loginError.value = "Invalid email or password";
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
    background: $gray-light;
    @include media-breakpoint-down($md) {
      padding: 20px;
    }
    .error-msg {
      font-size: 14px;
      color: $red;
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
            border-color: $red;
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