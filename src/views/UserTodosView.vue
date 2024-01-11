<template>
    <div>
        <h1>Todos für {{ username }}</h1>
        <form @submit.prevent="addTodo">
            <input v-model="newTodo" placeholder="Neues Todo hinzufügen" />
            <button type="submit">Hinzufügen</button>
        </form>
        <ul>
            <li v-for="todo in todos" :key="todo.id">
                {{ todo.taetigkeit }}
            </li>
        </ul>
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
    async created() {
        try {
            const response = await axios.get(`http://localhost:8080/users/${this.username}/todos`);
            this.todos = response.data;
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async addTodo() {
            try {
                const todo = {
                    taetigkeit: this.newTodo,
                    erledigt: false,
                };
                const response = await axios.post(`http://localhost:8080/users/${this.username}/todos`, todo);
                this.todos.push(response.data);
                this.newTodo = '';
            } catch (error) {
                console.error(error);
            }
        },
    },
};
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