<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { defineAsyncComponent } from 'vue'

const HomePage = defineAsyncComponent(() => import('./components/LandingPage.vue'))
</script>
<style scoped>
app{
  margin: 0 !important;
  padding: 0 !important;
}
body, html {
  margin: 0;
  padding: 0;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.wrapper {
  padding : 0 !important;
  margin: 0 !important;
  width: 100vw; /* Make wrapper cover the full width of the viewport */
  height: 100vh; /* Make wrapper cover the full height of the viewport */
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
