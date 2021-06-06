import API from '../api';
import * as types from './mutation-types';

export default {
  fetchBarChartData({ commit }){
    API.getBarChartData().then(res => commit(types.UPDATE_INITIAL_BAR_DATA, res.data))
  },
  addCountry({commit}, {country}){
    commit(types.ADD_SELECTED_COUNTRY, {country})
  }
}