<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home <i class="ri-home-4-line"></i></RouterLink>
        <RouterLink to="/about">About <i class="ri-information-2-line"></i></RouterLink>
        <router-link v-if="isLoggedIn" to="/todos">ToDos</router-link>
        <RouterLink to="/register">Registrieren <i class="ri-user-add-line"></i></RouterLink>
        <RouterLink to="/login">Login <i class="ri-login-box-line"></i></RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      // Überprüfen Sie, ob ein Authentifizierungstoken im lokalen Speicher vorhanden ist
      return !!localStorage.getItem('token');
    },
  },
};
</script>

<style scoped>
/* Ihre vorhandenen Stile */

nav a {
  display: inline-block;
  padding: 0.5rem 1rem; /* Fügt Polsterung hinzu */
  border: 1px solid var(--color-border); /* Fügt einen Rand hinzu */
  margin-right: 0.5rem; /* Fügt rechten Rand hinzu */
  text-decoration: none; /* Entfernt die Unterstreichung */
  color: white; /* Setzt die Textfarbe */
  background-color: #63024e; /* Setzt die Hintergrundfarbe */
  transition: background-color 0.3s ease; /* Fügt eine Übergangseffekt hinzu */
}

nav a:hover {
  background-color: #2b0320; /* Ändert die Hintergrundfarbe beim Überfahren mit der Maus */
}

nav a:first-of-type {
  margin-left: 0; /* Entfernt linken Rand vom ersten Link */
}
</style>