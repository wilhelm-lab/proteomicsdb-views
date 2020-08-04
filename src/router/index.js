import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Analytics from '../views/Analytics.vue'
import ProteinSearch from '../views/ProteinSearch.vue'
import ProteinWrapper from '../views/protein/ProteinWrapper.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/protein/search/:searchString',
    name: 'proteinSearch',
    component: ProteinSearch
  },
  {
    path: '/peptide/',
    name: 'peptide',
    component: Home
  },
  {
    path: '/project/',
    name: 'project',
    component: ProteinWrapper
  },
  {
    path: '/analytics/',
    name: 'analytics',
    component: Analytics
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
