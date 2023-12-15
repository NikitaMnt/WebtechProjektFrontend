<template>
  <div class="container">
    <h1>ToDo-Liste</h1>

    <!-- Formular zum Hinzufügen von ToDos -->
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Neues ToDo hinzufügen" />
      <button type="submit">Hinzufügen</button>
    </form>

    <table class="todo-table">
      <thead>
      <tr>
        <th>Tätigkeit</th>
        <th>Erledigt</th>
        <th>Aktionen</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(todo, index) in todos" :key="todo.id">
        <td>{{ todo.taetigkeit }}</td>
        <td>
          <input type="checkbox" :checked="todo.erledigt" @click="updateTodo(index)">
        </td>
        <td>
          <!-- Button zum Löschen von ToDos -->
          <button @click="removeTodo(index)">Löschen</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const todos = ref([]);
const newTodo = ref('');

const fetchTodos = async () => {
  try {
    const response = await axios.get('http://localhost:8080/todos');
    todos.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const addTodo = async () => {
  try {
    const response = await axios.post('http://localhost:8080/todos', { taetigkeit: newTodo.value, erledigt: false });
    todos.value.push(response.data);
    newTodo.value = '';
  } catch (error) {
    console.error(error);
  }
};

const removeTodo = async (index) => {
  try {
    const todo = todos.value[index];
    console.log(`Deleting todo with id: ${todo.id}`); // Ausgabe der ID des zu löschenden ToDos
    const response = await axios.delete(`http://localhost:8080/todos/${todo.id}`);
    console.log(`Server response: ${response}`); // Ausgabe der Antwort des Servers
    await fetchTodos(); // Ruft die Liste der ToDos erneut ab
  } catch (error) {
    console.error(error);
  }
};

const updateTodo = async (index) => {
  try {
    const todo = todos.value[index];
    todo.erledigt = !todo.erledigt; // Wechselt den erledigt-Status
    const response = await axios.put(`http://localhost:8080/todos/${todo.id}`, todo);
    console.log(`Server response: ${response}`); // Ausgabe der Antwort des Servers
    await fetchTodos(); // Ruft die Liste der ToDos erneut ab
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchTodos);
</script>

<style scoped>
.todo-table {
  width: 100%;
  border-collapse: collapse;
}

.todo-table th, .todo-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.todo-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.todo-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
</style>