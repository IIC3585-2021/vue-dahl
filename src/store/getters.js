export default {
  getCountriesFromData: (state) => {
    return Object.keys(state.data).map(name => name)
  },

  getSchema: (state) => {
    return Object.keys(state.data).map( name => ({
      name: name, 
      active_cases: state.data[name].active_cases, 
      deaths: state.data[name].deaths, 
      total_cases: state.data[name].total_cases, 
    }))
  }
}