import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue'; // Stellen Sie sicher, dass Sie die LoginView-Komponente importieren
import RegisterView from '../views/RegisterView.vue'; // Stellen Sie sicher, dass Sie die RegisterView-Komponente importieren
import UserTodosView from '../views/UserTodosView.vue';

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
      path: '/login', // Hinzufügen der Login-Route
      name: 'login',
      component: LoginView
    },
    {
      path: '/register', // Hinzufügen der Registrierungs-Route
      name: 'register',
      component: RegisterView
    },
    {
      path: '/todos/:username',
      name: 'UserTodos',
      component: UserTodosView,
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;