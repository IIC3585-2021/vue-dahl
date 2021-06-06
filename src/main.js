import Vue from "vue";
import App from './App.vue'
import Vuex from 'vuex'
import { BootstrapVue } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(Vuex)
Vue.use(BootstrapVue)


const store = new Vuex.Store({
  state: {
    country: "",
    data: {},
    filteredData: {},
    default: 'No has seleccionado país',
  },
  mutations: {
    increment (state, name) {
      state.country = name;
    },
    setData (state, data) {
      state.data = data
    },
    filterData(state, country){
      state.filteredData = state.data.filter(elem => elem.name === country);
    },
  }
})

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
