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