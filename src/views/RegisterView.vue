<template>
  <div class="register-container">
    <h2>Registrierung</h2>
    <form @submit.prevent="register" class="register-form">
      <input v-model="username" type="text" placeholder="Benutzername" required class="input-field">
      <input v-model="email" type="email" placeholder="E-Mail" required class="input-field">
      <input v-model="password" type="password" placeholder="Passwort" required class="input-field">
      <input v-model="passwordConfirmation" type="password" placeholder="Passwort bestätigen" required class="input-field">
      <button type="submit" class="submit-button">Registrieren</button>
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
      passwordConfirmation: '',
    };
  },
  methods: {
    async register() {
      if (this.password !== this.passwordConfirmation) {
        alert('Die Passwörter stimmen nicht überein!');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8080/users', {
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

<style scoped>
.register-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.input-field {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
}

.submit-button {
  padding: 10px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0a380c;
}
</style>