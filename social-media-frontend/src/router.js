import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import Login from './components/Login.vue'
import Signup from './components/SignUp.vue'
import Home from './components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  // Add more routes as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router