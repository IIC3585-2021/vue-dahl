import Vue from "vue";
import App from './App.vue'
//import Vuex from 'vuex'
import { BootstrapVue } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

Vue.config.productionTip = false;

// Vue.use(Vuex)
Vue.use(BootstrapVue)


/* const store = new Vuex.Store({
  state: {
    countries: [],
    data: {},
    filteredData: {},
  },
  mutations: {
    addCountry (state, name) {
      state.countries.push(name);
    },
    deleteCountry (state, name) {
      state.countries = state.countries.filter(e => e !== name);
    },
    setData (state, data) {
      state.data = data
    },
    filterData(state, country){
      state.filteredData = state.data.filter(elem => elem.name === country);
    },
  }
})
*/

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
