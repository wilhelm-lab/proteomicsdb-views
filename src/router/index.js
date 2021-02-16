import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Analytics from '../views/Analytics.vue'
import ProteinSearch from '../views/search/ProteinSearch.vue'
import ProteinWrapper from '../views/protein/ProteinWrapper.vue'
import ProteinSummary from '@/views/protein/ProteinSummary.vue'
import PeptidesMSMS from '@/views/protein/PeptidesMSMS.vue'
import ReferencePeptides from '@/views/protein/ReferencePeptides.vue'
import FDR from '@/views/protein/FDR.vue'
import Expression from '@/views/protein/Expression.vue'
import InteractionNetwork from '@/views/protein/InteractionNetwork.vue'
import FeatureViewer from '@/views/protein/FeatureViewer.vue'
import PeptideDetails from '@/views/popup/PeptideDetailsPopUp.vue'
import RefPeptideDetails from '@/views/popup/ReferencePeptideDetailsPopUp.vue'
import Proteotypicity from '@/views/protein/Proteotypicity.vue'

Vue.use(VueRouter)

  export default new VueRouter({
    routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/protein/',
      name: 'proteinHome',
      component: ProteinWrapper,
      children: [
        {
          path: 'summary/:proteinId',
          name: 'proteinSummary',
          component: ProteinSummary
        },
        {
          path: 'featureViewer/:proteinId',
          name: 'featureViewer',
          component: FeatureViewer
        },
        {
          path: 'peptides/:proteinId',
          name: 'PeptidesMSMS',
          component: PeptidesMSMS,
          children: [
            {
              path: ':peptideId',
              name: 'PeptideDetails',
              component: PeptideDetails,
              props: (route) => ({ 
                proteinId: route.params.proteinId,
                peptideId: route.params.peptideId,
                openDialog: true
              })
            }
          ]
        },
        {
          path: 'referencePeptides/:proteinId',
          name: 'ReferencePeptides',
          component: ReferencePeptides,
          children: [
            {
              path: ':peptideId',
              name: 'RefPeptideDetails',
              component: RefPeptideDetails,
              props: (route) => ({ 
                proteinId: route.params.proteinId,
                peptideId: route.params.peptideId,
                openDialog: true
              })
            }
          ]
        },
        {
          path: 'proteotypicity/:proteinId',
          name: 'Proteotypicity',
          component: Proteotypicity
        },
        {
          path: 'expression/:proteinId',
          name: 'Expression',
          component: Expression
        },
        {
          path: 'fdr/:proteinId',
          name: 'FDR',
          component: FDR
        },
        {
          path: 'interactions/:proteinId',
          name: 'InteractionNetwork',
          component: InteractionNetwork
        }
      ]
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

