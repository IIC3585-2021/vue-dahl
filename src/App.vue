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
      <span>Seleccionado: {{ countryVal }}</span>
      <b-button v-on:click="delete_country">Borrar búsqueda</b-button>
      <b-table striped hover :items="this.$store.state.data" :filter="this.$store.state.country" :fields="fields"></b-table>
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
      data: [],
      responseAvailable: false,
      countryVal: 'No has seleccionado país',
      fields: [
          {
            key: 'name',
            sortable: true
          },
          {
            key: 'active_cases',
            sortable: true
          },
          {
            key: 'deaths',
            sortable: true,
          },
          {
            key: 'total_cases',
            sortable: true,
          }
        ],
    };
  },
  methods: {
    delete_country(){
      this.$store.commit('increment', '');
      this.countryVal = 'No has seleccionado país';
      console.log('data', this.$store.state.data);
    },
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

    const schema = Object.keys(regions).map( name => ({
      name: name, 
      active_cases: regions[name].active_cases, 
      deaths: regions[name].deaths, 
      total_cases: regions[name].total_cases, 
    }))

    this.$store.commit('setData', schema);

    this.responseAvailable = true;
  }
};
</script>

<style>
</style>
