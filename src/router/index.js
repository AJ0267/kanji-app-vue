import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import ListView from '../views/ListView.vue'
import QuizView from '@/views/QuizView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/list',
    name: 'list',
    component: ListView
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
