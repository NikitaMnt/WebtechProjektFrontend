import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ToDoView from '../views/ToDoView.vue'; // Passe den Pfad an

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/todo', // Die URL, unter der die ToDo-Liste angezeigt werden soll
      name: 'ToDoList',
      component: ToDoView
    }
  ]
});

export default router;
