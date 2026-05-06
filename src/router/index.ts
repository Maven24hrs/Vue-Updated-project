import { createRouter, createWebHistory } from 'vue-router'
import Todos from '../views/Todos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: Todos,
    },
    {
      path: '/todos/:id',
      name: 'todo-details',
      component: () => import('../views/TodoDetails.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router
