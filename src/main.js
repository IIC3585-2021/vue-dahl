import Vue from "vue";
import App from './App.vue'
import Vuex from 'vuex'
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false;

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    country: "", 

  },
  mutations: {
    increment (state, name) {
      state.country = name;
    }
  }
})

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
