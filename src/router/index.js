import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/about/AboutUs.vue'
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
import ProteinProjects from '@/views/protein/ProteinProjects.vue'
import Kinase from '@/views/protein/KinaseInhibitorsView.vue'
import Meltome from '@/views/protein/MeltomeView.vue'
import Turnover from '@/views/protein/TurnoverView.vue'

import axios from 'axios';

Vue.use(VueRouter);

function getProteinId (to, from, next) {
  let tempProteinId = to.params.proteinId;
  if (isNaN(parseInt(tempProteinId))) {
    axios.get('https://www.proteomicsdb.org/logic/getProteinId.xsjs', {params: { protein_id:tempProteinId }})
      .then(function(response) {
        to.params.proteinId = response.data + '';
        next();
      });
  } else {
    next();
  }
}


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
      path: ':proteinId/',
      name: 'protein',
      beforeEnter: getProteinId,
      component: ProteinSummary
    },
    {
      path: ':proteinId/summary',
      name: 'proteinSummary',
      beforeEnter: getProteinId,
      component: ProteinSummary
    },
    {
      path: ':proteinId/featureViewer',
      name: 'featureViewer',
      beforeEnter: getProteinId,
      component: FeatureViewer
    },
    {
      path: ':proteinId/peptides',
      name: 'PeptidesMSMS',
      beforeEnter: getProteinId,
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
      path: ':proteinId/referencePeptides',
      name: 'ReferencePeptides',
      beforeEnter: getProteinId,
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
      path: ':proteinId/proteotypicity',
      name: 'Proteotypicity',
      beforeEnter: getProteinId,
      component: Proteotypicity
    },
    {
      path: ':proteinId/projects',
      name: 'ProteinProjects',
      beforeEnter: getProteinId,
      component: ProteinProjects
    },
    {
      path: ':proteinId/expression',
      name: 'Expression',
      beforeEnter: getProteinId,
      component: Expression
    },
    {
      path: ':proteinId/fdr',
      name: 'FDR',
      beforeEnter: getProteinId,
      component: FDR
    },
    {
      path: ':proteinId/interactions',
      name: 'InteractionNetwork',
      beforeEnter: getProteinId,
      component: InteractionNetwork
    },
    {
      path: ':proteinId/inhibitors',
      name: 'KinaseInhibitors',
      beforeEnter: getProteinId,
      component: Kinase
    },
    {
      path: ':proteinId/meltome',
      name: 'Meltome',
      beforeEnter: getProteinId,
      component: Meltome
    },
    {
      path: ':proteinId/turnover',
      name: 'Turnover',
      beforeEnter: getProteinId,
      component: Turnover
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
    component: About
  }
  ],
  mode: 'history'
})

