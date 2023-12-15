<template>
  <div class="container">
    <h1>ToDo-Liste</h1>
    <table class="todo-table">
      <thead>
      <tr>
        <th>Tätigkeit</th>
        <th>Erledigt</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="todo in todos" :key="todo.id">
        <td>{{ todo.taetigkeit }}</td>
        <td><span v-if="todo.erledigt">☑</span></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const todos = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/todos');
    todos.value = response.data;
  } catch (error) {
    console.error(error);
  }
});
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