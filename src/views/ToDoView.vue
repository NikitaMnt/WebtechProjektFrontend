<template>
  <div class="container">
    <h1>ToDo-Liste</h1>

    <!-- Formular zum Hinzufügen von ToDos -->
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Neues ToDo hinzufügen" />
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
  if(!newTodo.value.trim()) return;
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

const editTodo = (index) => {
  todos.value[index].isEditing = true;
};

const submitTodo = async (index) => {
  const todo = todos.value[index];
  if (!todo.taetigkeit.trim()) {
    console.error('ToDo cannot be empty');
    await fetchTodos(); // Ruft die Liste der ToDos erneut ab, um die Änderungen zu verwerfen
    return;
  }
  todos.value[index].isEditing = false;
  await updateTodoText(index); // Aktualisiert das ToDo auf dem Server
};

const stopEditingTodo = async (index) => {
  const todo = todos.value[index];
  if (!todo.taetigkeit.trim()) {
    console.error('ToDo cannot be empty');
    await fetchTodos(); // Ruft die Liste der ToDos erneut ab, um die Änderungen zu verwerfen
    return;
  }
  todos.value[index].isEditing = false;
  await updateTodoText(index); // Aktualisiert das ToDo auf dem Server
};

const updateTodoText = async (index) => {
  try {
    const todo = todos.value[index];
    const response = await axios.put(`http://localhost:8080/todos/${todo.id}`, todo);
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