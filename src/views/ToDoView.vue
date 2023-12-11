<template>
  <div class="container">
    <h1>ToDo-Liste</h1>
    <input type="number" v-model="todoId" placeholder="ToDo ID">
    <button @click="fetchToDoById">ToDo nach ID abrufen</button>
    <div v-if="selectedTodo">
      <h2>ToDo nach ID:</h2>
      <p>{{ selectedTodo }}</p> <!-- Anzeige der taetigkeit -->
    </div>
    <!-- Restlicher Code bleibt unverändert -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const todos = ref([]);
const error = ref(null);
const searchTerm = ref('');
const todoId = ref(null);
const selectedTodo = ref(null);

const fetchToDos = async () => {
  try {
    const response = await axios.get('http://localhost:8080/todos');
    todos.value = response.data;
  } catch (err) {
    error.value = err.message;
  }
};

onMounted(fetchToDos);

const fetchToDoById = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/todos/${todoId.value}`);
    if (!response.data) {
      throw new Error('ToDo not found');
    }
    // Speichern der taetigkeit des ToDo-Objekts
    selectedTodo.value = response.data.taetigkeit;
  } catch (error) {
    console.error('Fetch ToDo by ID error:', error);
    // Handle den Fehler entsprechend
  }
};

const filteredTodos = computed(() => {
  return todos.value.filter(todo => todo.title.toLowerCase().includes(searchTerm.value.toLowerCase()));
});
</script>

<style scoped>
/* Deine CSS-Stile hier */
</style>
