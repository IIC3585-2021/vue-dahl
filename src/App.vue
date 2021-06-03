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
          :chartLabels="names"
          :options="chartOptions"
          label="Positive"
        />
      </div>
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
      regions: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
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

    const { data } = await axios.request(options);
    const regions = data.data.regions;
    
    this.names = Object.keys(regions).map(name => name);
    this.totalCases = this.names.map( name => regions[name].total_cases);
  
  }
};
</script>

<style>
</style>
