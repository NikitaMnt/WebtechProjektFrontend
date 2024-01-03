<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Benutzername" required>
        <input v-model="password" type="password" placeholder="Passwort" required>
        <button type="submit">Einloggen</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:8080/login', {
            username: this.username,
            password: this.password,
          });
          // Speichern Sie das Authentifizierungstoken und den Benutzernamen im lokalen Speicher
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', this.username);
          // Leiten Sie den Benutzer zur ToDo-Liste weiter
          this.$router.push('/todos');
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>