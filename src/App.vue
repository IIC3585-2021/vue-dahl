<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col">
        <h1 class="text-center">COVID-19 DATA</h1>
      </div>
    </div>
    <div class="row mt-5" v-if="totalCases.length > 0">
      <div class="col">
        <h2 class="text-center">Positive</h2>
        <bar-chart
          :chartData="totalCases"
          :chartLabels="countries"
          :options="chartOptions"
          label="Positive"
        />
      </div>
      <select v-model="countryVal" @change="increment($event)">
      <option v-for="country in countries" v-bind:key="country">
        {{country}}
      </option>
      </select>
    </div>

  </div>
</template>

<script>
import axios from "axios";

import BarChart from "./components/BarChart";

export default {
  components: {
    BarChart
  },
  data() {
    return {
      totalCases: [],
      countries: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      countryVal: '',
      responseAvailable: false,
    };
  },
  methods: {
    increment(event) {
      this.$store.commit('increment', event.target.value)
      console.log("STORE",this.$store.state.country)
    }
  },
  async created() {
    
    const options = {
      method: 'GET',
      url: 'https://coronavirus-map.p.rapidapi.com/v1/summary/latest',
      headers: {
        'x-rapidapi-key': '531a08cec7msh94a6d9b4e4a844ep15f8fbjsnb6421a2820ce',
        'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
      }
    };

    const { data } = await axios.request(options)
      .catch( e => console.error(e));
    const regions = data.data.regions;
    
    this.countries = Object.keys(regions).map(name => name);
    this.totalCases = this.countries.map( name => regions[name].total_cases);

    this.responseAvailable = true;
  }
};
</script>

<style>
</style>
