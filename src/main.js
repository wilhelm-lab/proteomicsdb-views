import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import vuetify from './plugins/vuetify';
import vueCookie from 'vue-cookie';
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import store from '@/store/store.js'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserCircle, faSeedling } from "@fortawesome/free-solid-svg-icons";

Vue.component("font-awesome-icon", FontAwesomeIcon); // Register component globally
library.add(faUserCircle, faSeedling); // Include needed icons.

Vue.use(vueCookie);

Vue.use(vuetify, {
  theme: {
    primary: "#0E2D4E",
    secondary: "#BFDA79",
    accent: "#BFDA79",
    9606: '#0065BD',
    3702: '#007C30',
    10090: '#C4071B'
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
