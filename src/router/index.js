import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import BooksView from '../views/BooksView.vue'
import BookView from '../views/BookView.vue'
import SearchView from '../views/SearchView.vue'
import ErrorView from '../views/ErrorView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/books',
    name: 'BooksView',
    component: BooksView,
  },
  {
    path: '/books/:bookId',
    name: 'BookView',
    component: BookView,
  },
  {
    path: '/results/:keyword',
    name: 'SearchView',
    component: SearchView,
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: ErrorView }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
