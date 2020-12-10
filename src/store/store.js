import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cookie: null,
    search: "",
    selectedOrganismShown: {}
  },
  mutations: {
    setOrganism (state, payload) {
      return state.cookie = payload.value
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
