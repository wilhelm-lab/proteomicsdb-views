import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home/',
    name: 'home',
    component: Home
  },
  {
    path: '/protein/',
    name: 'protein',
    component: Home
  },
  {
    path: '/peptide/',
    name: 'peptide',
    component: Home
  },
  {
    path: '/project/',
    name: 'project',
    component: Home
  },
  {
    path: '/analytics/',
    name: 'analytics',
    component: Home
  },
  {
    path: '/api/',
    name: 'api',
    component: Home
  },
  {
    path: '/faq/',
    name: 'faq',
    component: Home
  },
  {
    path: '/about/',
    name: 'about',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
