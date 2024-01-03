<template>
    <div>
      <h2>Registrierung</h2>
      <form @submit.prevent="register">
        <input v-model="username" type="text" placeholder="Benutzername" required>
        <input v-model="email" type="email" placeholder="E-Mail" required>
        <input v-model="password" type="password" placeholder="Passwort" required>
        <button type="submit">Registrieren</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async register() {
        try {
          await axios.post('http://localhost:8080/register', {
            username: this.username,
            email: this.email,
            password: this.password,
          });
          // Leiten Sie den Benutzer zur Login-Seite weiter
          this.$router.push('/login');
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>