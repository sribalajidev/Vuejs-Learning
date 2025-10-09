<script setup>
import { ref, onMounted } from 'vue';
// import icons
import sunIcon from '../assets/icons/sun.svg';
import moonIcon from '../assets/icons/moon.svg';

// theme state — default is light
const theme = ref('light');

// check sessionStorage on load
onMounted(() => {
  const savedTheme = sessionStorage.getItem('theme')
  if (savedTheme) theme.value = savedTheme
  document.body.dataset.theme = theme.value
})

function toggleTheme() {
  // flip between light and dark
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.body.dataset.theme = theme.value;
  sessionStorage.setItem('theme', theme.value) // store theme in sessionStorage
}

</script>

<template>
  <div class="theme-toggle" @click="toggleTheme">
    <img v-if="theme === 'light'" :src="sunIcon" alt="Light Mode" class="icon light-theme" />
    <img v-else :src="moonIcon" alt="Dark Mode" class="icon dark-theme" />
  </div>
</template>

<style scoped lang="scss">
.theme-toggle {
  .icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-left: 15px;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>