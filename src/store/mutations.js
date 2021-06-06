import * as types from './mutation-types';
import Vue from 'vue'

export default {
  [types.UPDATE_INITIAL_BAR_DATA](state, {data}){
    state.data = data.regions;
  },

  [types.ADD_SELECTED_COUNTRY](state, { country }){
    Vue.set(state.countries, country)
  }
}