import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Analytics from '../views/Analytics.vue'
import ProteinSearch from '../views/search/ProteinSearch.vue'
import ProteinWrapper from '../views/protein/ProteinWrapper.vue'

Vue.use(VueRouter)

  export default new VueRouter({
    routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/protein/search',
      name: 'proteinSearch',
      component: ProteinSearch,
      props: (route) => ({ 
        searchString: route.query.q,
        searchType: route.query.s
      })

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
    ],
    mode: 'history'
  })

