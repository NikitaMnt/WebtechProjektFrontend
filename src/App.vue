<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/todos">ToDos</RouterLink> <!-- Neuer Link -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Ihre vorhandenen Stile */

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  margin-right: 0; /* Fügt rechten Rand hinzu */
}

nav a:first-of-type {
  border: 0;
  margin-left: 0; /* Entfernt linken Rand vom ersten Link */
}
</style>