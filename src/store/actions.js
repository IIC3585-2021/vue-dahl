import API from "../api";
import * as types from "./mutation-types";

export default {
  fetchBarChartData({ commit }) {
    commit(types.CHANGE_FETCHING, true);
    API.getBarChartData().then((res) => {
      commit(types.FETCH_BAR_CHART_DATA, res.data);
      commit(types.CHANGE_FETCHING, false);
    });
  },
  addCountry({ commit }, country) {
    commit(types.ADD_SELECTED_COUNTRY, country);
  },
  deleteCountry({ commit }, country) {
    commit(types.DELETE_SELECTED_COUNTRY, country);
  },
  changeChart({ commit }, chartType) {
    commit(types.CHANGE_CHART, chartType);
  },
};
