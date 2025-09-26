<script setup>
// import components
import ThemeToggle from './ThemeToggle.vue';

</script>

<template>
  <header class="app-header">
    <nav class="navbar">
      <a class="navbar-brand" href="#">Vuejs Learning</a>
      <ul class="navbar-nav">
        <li class="nav-item">Menu 1</li>
        <li class="nav-item">Menu 2</li>
        <li class="nav-item">Menu 3</li>
      </ul>
      <!-- toggle component -->
      <ThemeToggle />
    </nav>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: var(--gray-light);
  border-bottom: 1px solid var(--black);
  padding: 15px;
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    .navbar-brand {
      font-size: 20px;
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
  }
}
</style>