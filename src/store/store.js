import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    taxcode: null,
    search: "",
    selectedOrganismShown: {},
    organisms: [
    {id: 0, text: 'Homo sapiens', icon: 'fas fa-user', taxcode: 9606, primaryColor: '#0065BD', secondaryColor: '#6cbbff'},
    {id: 1, text: 'Arabidopsis thaliana', icon: 'fas fa-seedling', taxcode: 3702, primaryColor: '#007C30', secondaryColor: '#6fce94'},
    {id: 2, text: 'Mus musculus', icon: 'fas fa-paw', taxcode: 10090, primaryColor: '#C4071B', secondaryColor: '#db606d'},
    {id: 3, text: 'Oryza sativa subs. japonica', icon: 'fas fa-apple-alt', taxcode: 39947, primaryColor: '#007C30', secondaryColor: '#6fce94'}
    ],
    host: ''
  },
  getters: {
    organisms: state => {
      return state.organisms;
    },
    host: state => {
      return state.host;
    },
    selectedOrganism: state => {
      return { taxcode: state.taxcode }
    }
  },
  mutations: {
    setOrganism (state, payload) {
      let t = Object.assign(state.organisms.filter((x) => { return(x.taxcode === parseInt(payload.value))})[0]);
      state.selectedOrganismShown = t;
      return state.taxcode = payload.value
    },
    setShownOrganism (state, payload) {
      return state.selectedOrganismShown = payload.value
    },
    setSearchString (state, payload) {
      return state.search = payload.value
    }
  },
  actions: {
    setOrganism (context, payload) {
      context.commit('setOrganism', payload)
    },
    setShownOrganism (context, payload) {
      context.commit('setShownOrganism', payload)
    },
    setSearchString (context, payload) {
      context.commit('setSearchString', payload)
    }
    
  }
})

export default store;
