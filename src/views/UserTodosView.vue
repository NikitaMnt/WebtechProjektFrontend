<template>
    <div class="container">
      <h1>Todos für {{ username }}</h1>
      <form @submit.prevent="addTodo">
        <input v-model="newTodo" placeholder="Neues Todo hinzufügen" />
        <button type="submit">Hinzufügen <i class="ri-add-line"></i></button>
      </form>
      
      <table class="todo-table">
        <thead>
        <tr>
          <th>Tätigkeit</th>
          <th>Aktionen</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(todo, index) in todos" :key="todo.id">
          <td v-if="!todo.isEditing">{{ todo.taetigkeit }}</td>
          <td v-else>
            <input v-model="todo.taetigkeit" @blur="stopEditingTodo(index)" @keyup.enter="submitTodo(index)">
          </td>
          <td>
            <button v-if="!todo.isEditing" @click="editTodo(index)">Bearbeiten <i class="ri-pencil-line"></i></button>
            <button v-else @click="stopEditingTodo(index)">Fertig</button>
            <button @click="removeTodo(index)">Löschen <i class="ri-delete-bin-6-line"></i></button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: this.$route.params.username,
        todos: [],
        newTodo: '',
      };
    },
    methods: {
      async addTodo() {
        const response = await axios.post(`http://localhost:8080/users/${this.username}/todos`, {
          taetigkeit: this.newTodo,
          erledigt: false
        });
        this.todos.push(response.data);
        this.newTodo = '';
      },
      async removeTodo(index) {
    const todo = this.todos[index];
    try {
      await axios.delete(`http://localhost:8080/users/${this.username}/todos/${todo.id}`);
      this.todos.splice(index, 1);
    } catch (error) {
      console.error("Fehler beim Löschen des Todos: ", error);
    }
  },
      editTodo(index) {
        this.todos[index].isEditing = true;
      },
      stopEditingTodo(index) {
        this.todos[index].isEditing = false;
      },
      submitTodo(index) {
        this.todos[index].isEditing = false;
        // Hier könnten Sie auch eine Anforderung an den Server senden, um das aktualisierte Todo zu speichern
      }
    },
    async created() {
      const response = await axios.get(`http://localhost:8080/users/${this.username}/todos`);
      this.todos = response.data.map(todo => ({ ...todo, isEditing: false }));
    },
  };
  </script>
  
  <style scoped>
<style scoped>
.todo-table {
  width: 100%;
  border-collapse: collapse;
}

.todo-table th, .todo-table td {
  border: 1px solid #63024e;
  padding: 8px;
}

.todo-table th {
  color: white;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #000000;
  color: white;
  font-size: 1.2em; /* Größere Schrift für die Überschriften */
}

h1 {
  text-align: center;
}

button {
  background-color: #63024e; /* Setzt die Hintergrundfarbe */
  color: white; /* Setzt die Textfarbe */
  border: none; /* Entfernt den Rand */
  padding: 10px 20px; /* Fügt Polsterung hinzu */
  text-align: center; /* Zentriert den Text */
  text-decoration: none; /* Entfernt die Unterstreichung */
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer; /* Ändert den Mauszeiger beim Überfahren */
  transition: background-color 0.3s ease; /* Fügt einen Übergangseffekt hinzu */
}

button:hover {
  background-color: #2b0320; /* Ändert die Hintergrundfarbe beim Überfahren mit der Maus */
}

input {
  width: 88%; /* Setzt die Breite */
  padding: 12px 20px; /* Fügt Polsterung hinzu */
  margin: 8px 0; /* Fügt einen Rand hinzu */
  box-sizing: border-box; /* Stellt sicher, dass Padding und Border in der Gesamtbreite enthalten sind */
  border: 2px solid #63024e; /* Fügt einen Rand hinzu */
  border-radius: 4px; /* Rundet die Ecken ab */
}

</style>