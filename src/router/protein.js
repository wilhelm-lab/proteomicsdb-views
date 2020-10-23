import Vue from 'vue'
import VueRouter from 'vue-router'
import ProteinSummary from '@/views/protein/ProteinSummary.vue'
import ProteinWrapper from '@/views/protein/ProteinWrapper.vue'

Vue.use(VueRouter)

  export default new VueRouter({
    routes: [
    {
      path: '/protein/',
      name: 'proteinmain',
      component: ProteinWrapper
    },
    {
      path: '/protein/summary/:proteinId',
      name: 'proteinSummary',
      component: ProteinSummary
    }
    ],
    mode:'history'
  })

