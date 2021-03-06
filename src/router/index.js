import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/about/AboutUs.vue'
import API from '../views/API.vue'
import API2Documentation from '../views/apiv2documentation/DocuMain.vue';
import FAQ from '../views/FAQ.vue'
import ComingSoon from '../views/ComingSoon.vue'
import Disclaimer from '../views/Disclaimer.vue'
import NotFound from '../views/NotFound.vue'
import CellSensitivity from '../views/analytics/CellSensitivity.vue'
import Analytics from '../views/analytics/AnalyticsWrapper.vue'
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
// import ED from '@/views/project/ExperimentDesign.vue'
import axios from 'axios';
import SelectivityView from "../views/analytics/SelectivityView";
import AnalyticsHome from "../views/analytics/AnalyticsHome";

Vue.use(VueRouter);

function getProteinId(to, from, next) {
  let tempProteinId = to.params.proteinId;
  if (isNaN(parseInt(tempProteinId))) {
    axios.get('https://www.proteomicsdb.org/logic/getProteinId.xsjs', { params: { protein_id: tempProteinId } })
      .then(function (response) {
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
      component: Home,
      meta: {
        helpKey: 'overview'
      }
    },
    {
      path: '/vue/',
      name: 'home',
      component: Home,
      meta: {
        helpKey: 'overview'
      }
    },
    {
      path: '/vue/protein/',
      name: 'proteinHome',
      component: ProteinWrapper,
      children: [
        {
          path: ':proteinId/',
          name: 'protein',
          beforeEnter: getProteinId,
          component: ProteinSummary,
          meta: {
            helpKey: 'summaryTab'
          },
          props: true
        },
        {
          path: ':proteinId/summary',
          name: 'proteinSummary',
          beforeEnter: getProteinId,
          component: ProteinSummary,
          meta: {
            helpKey: 'summaryTab'
          },
          props: true
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
          meta: {
            helpKey: 'peptidesTab'
          },
          props: true,
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
          meta: {
            helpKey: 'referencePeptidesTab'
          },
          props: true,
          children: [
            {
              path: ':peptideId',
              name: 'RefPeptideDetails',
              component: RefPeptideDetails,
              props: (route) => ({
                proteinId: route.params.proteinId,
                peptideId: route.params.peptideId,
                openDialog: true
              }),
              //TODO: No help exists for this component - and the help modal would not be visible right now, since the popup is placed on top of it
            }
          ]
        },
        {
          path: ':proteinId/proteotypicity',
          name: 'Proteotypicity',
          beforeEnter: getProteinId,
          component: Proteotypicity,
          meta: {
            helpKey: 'proteotypicityTab'
          },
          props: true,
        },
        {
          path: ':proteinId/projects',
          name: 'ProteinProjects',
          beforeEnter: getProteinId,
          component: ProteinProjects,
          meta: {
            helpKey: 'projectsTab'
          },
          props: true,

        },
        {
          path: ':proteinId/expression',
          name: 'Expression',
          beforeEnter: getProteinId,
          component: Expression,
          meta: {
            helpKey: 'expressionTab'
          },
          props: true,
        },
        {
          path: ':proteinId/fdr',
          name: 'FDR',
          beforeEnter: getProteinId,
          component: FDR,
          meta: {
            helpKey: 'fdrTab'
          },
          props: true,
        },
        {
          path: ':proteinId/interactions',
          name: 'InteractionNetwork',
          beforeEnter: getProteinId,
          component: InteractionNetwork,
          meta: {
            helpKey: 'interactionsTab'
          },
          props: true,
        },
        {
          path: ':proteinId/inhibitors',
          name: 'KinaseInhibitors',
          beforeEnter: getProteinId,
          component: Kinase,
          meta: {
            helpKey: 'assayTab'
          },
          props: true,
        },
        {
          path: ':proteinId/meltome',
          name: 'Meltome',
          beforeEnter: getProteinId,
          component: Meltome,
          props: true,
        },
        {
          path: ':proteinId/turnover',
          name: 'Turnover',
          beforeEnter: getProteinId,
          component: Turnover,
          meta: {
            helpKey: 'assayTab'
          },
          props: true,
        }
      ]
    },
    {
      path: '/vue/search',
      name: 'proteinSearch',
      component: ProteinSearch,
      props: (route) => ({
        searchString: route.query.q,
        searchType: route.query.s
      }),
      meta: {
        helpKey: 'protein'
      }
    },
    {
      path: '/vue/peptide/',
      name: 'peptide',
      component: Home//TODO
    },
    {
      path: '/vue/project/',
      name: 'project',
      component: ComingSoon,//ED,
      children: [
        {
          path: '/vue/project/:pathMatch(.*)',
          component: ComingSoon,
        },]
    },
    {
      path: '/vue/api/',
      name: 'api',
      component: API
    },
    {
      path: '/vue/faq/',
      name: 'faq',
      component: FAQ
    },
    {
      path: '/vue/about/',
      name: 'about',
      component: About
    },
    {
      path: '/vue/apiv2/',
      name: 'apiv2',
      component: API2Documentation
    },
    {
      path: '/vue/disclaimer/',
      name: 'disclaimer',
      component: Disclaimer
    },
    {
      path: '/vue/404/',
      name: '404',
      component: NotFound
    },
    {
      path: '/vue/analytics/cellSensitivity',
      name: 'cellSensitivity',
      component: CellSensitivity
    },
    {
      path: '/vue/analytics/',
      name: 'analytics',
      component: Analytics,
      redirect: 'analytics.home',
      children: [
        {
          path: '',
          name: 'analytics.home',
          component: AnalyticsHome
        },
        {
          path: 'selectivity',
          name: 'selectivity',
          component: SelectivityView
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/vue/404'
    },
  ],
  mode: 'history'
})

