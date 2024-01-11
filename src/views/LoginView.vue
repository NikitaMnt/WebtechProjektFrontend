<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <input v-model="username" type="text" placeholder="Benutzername" required class="input-field">
      <input v-model="password" type="password" placeholder="Passwort" required class="input-field">
      <button type="submit" class="submit-button">Einloggen</button>
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
        const response = await axios({
          method: 'post',
          url: 'http://localhost:8080/users/login',
          data: {
            username: this.username,
            password: this.password,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          alert('Login erfolgreich!');
          // Hier können Sie den Benutzer nach dem erfolgreichen Login weiterleiten
          // Zum Beispiel, wenn Sie vue-router verwenden:
          this.$router.push(`/todos/${this.username}`);
        } else {
          alert('Falscher Benutzername oder Passwort!');
        }
      } catch (error) {
        console.error(error);
        alert('Ein Fehler ist aufgetreten!');
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
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