<template>
  <div class="container">
    <line-chart
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"/>
  </div>
</template>

<script>
import LineChart from '../charts/LineChart.js'
import axios from "axios";

export default {
  name: 'LineChartContainer',
  components: { LineChart },
  data: () => ({
    loaded: false,
    regions:"",
    chartdata: null
  }),
  async mounted () {
    this.loaded = false
      
      const options = {
        method: 'GET',
        url: 'https://coronavirus-map.p.rapidapi.com/v1/summary/latest',
        headers: {
          'x-rapidapi-key': '531a08cec7msh94a6d9b4e4a844ep15f8fbjsnb6421a2820ce',
          'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
        }
      };

      axios.request(options).then((response) => {
        console.log("First request", response.data);
        this.summary = response.data.data.summary;
        this.regions = response.data.data.regions;
        const names = Object.keys(this.regions)
        const data = Object.keys(this.regions).map( name => (
          {
              name: name, 
              active_cases: this.regions[name].active_cases, 
              deaths: this.regions[name].deaths, 
              total_cases: this.regions[name].total_cases, 
          }
        ))
        const total_cases = Object.keys(this.regions).map( name => (
              this.regions[name].total_cases
        ))
        console.log(data);

      this.loaded = true
      /* this.chartData = {
          labels: data.map(item => item.name),
          datasets: [
            label: 'Daily Cases',
             backgroundColor: '#f87979',
             data: data.map(item => item.total_cases)
          ]
        } */
    }).catch(function (error) {
      console.error(error);
      });
    },
}
</script>