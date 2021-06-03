import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from "axios";



const options = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/country/all',
  headers: {
    'x-rapidapi-key': 'SIGN-UP-FOR-KEY',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
  }
};


Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
