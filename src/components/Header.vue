<script setup>
// import components
import ThemeToggle from './ThemeToggle.vue';
// import icons
import cartIcon from '../assets/icons/cart.svg';
import userIcon from '../assets/icons/user.svg';

</script>

<template>
  <header class="app-header">
    <nav class="navbar">
      <a class="navbar-brand" href="#">Vuejs Learning</a>
      <div class="navbar-action">
        <ul>
          <li>My Cart</li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: var(--gray-light);
  border-bottom: 1px solid var(--black);
  padding: 20px;
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    .navbar-brand {
      font-size: 24px;
      font-weight: 600;
      color: var(--text-color);
    }
    .navbar-nav {
      display: flex;
      align-items: center;
      gap: 20px;
      margin: 0 0 0 auto;
      @include media-breakpoint-down($lg) {
        display: none;
      }
      .nav-item {
        list-style: none;
        cursor: pointer;
        font-weight: 500;
        color: var(--text-color);
        margin: 0;
        &:hover {
          color: var(--text-hover);
        }
      }
    }
    .navbar-action {
      display: flex;
      align-items: center;
      gap: 10px;
      ul {
        display: flex;
        gap: 10px;
        li {
          margin: 0;
        }
      }
    }
  }
}
</style>