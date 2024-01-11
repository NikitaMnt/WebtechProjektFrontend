<script setup>
import { watch, ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()
const isRotating = ref(false)
const isLoggedIn = ref(!!localStorage.getItem('token'))

let previousLoginStatus = isLoggedIn.value

watch(() => !!localStorage.getItem('token'), (currentLoginStatus) => {
  if (currentLoginStatus && !previousLoginStatus) {
    router.push('/todos')
  }
  previousLoginStatus = currentLoginStatus
})

const rotateIcon = () => {
  isRotating.value = !isRotating.value
}
const setLoginStatus = (status) => {
  localStorage.setItem('token', status)
  isLoggedIn.value = status
}

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home <i class="ri-home-4-line"></i></RouterLink>
        <RouterLink to="/about">About <i class="ri-information-2-line"></i></RouterLink>
        <router-link 
        v-if="isLoggedIn" to="/todos">ToDos</router-link>
        <RouterLink v-if="!isLoggedIn" to="/register">Registrieren <i class="ri-user-add-line"></i></RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/login">Login <i class="ri-login-box-line"></i></RouterLink>
        <img @click="rotateIcon" :class="{ 'rotate': isRotating }" src="/baltasar.png" class="icon-right" />      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Ihre vorhandenen Stile */
.icon-right {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 50px; /* Begrenzt die Breite des Bildes */
  height: 50px; /* Begrenzt die Höhe des Bildes */
  transition: transform 0.5s; /* Fügt eine Übergangseffekt hinzu */
}

.rotate {
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

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