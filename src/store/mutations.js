import * as types from "./mutation-types";

export default {
  [types.FETCH_BAR_CHART_DATA](state, { data }) {
    state.data = data.regions;
  },

  [types.ADD_SELECTED_COUNTRY](state, country) {
    state.graphCountries.push(country);
  },
  [types.DELETE_SELECTED_COUNTRY](state, country) {
    state.graphCountries = state.graphCountries.filter(
      (elem) => elem != country
    );
  },
  [types.CHANGE_FETCHING](state, fetching) {
    state.fetching = fetching;
  },
  [types.CHANGE_CHART](state, chartType) {
    state.selectedChart = chartType;
  },
};
