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
      <div>
        <span>Seleccionado: {{ countryVal }}</span>
        <div>
          <multiselect
            v-model="selectedCountries"
            @select="increment($event)"
            @remove="deleteCountry($event)"
            :options="countries"
            :multiple="true"
            :close-on-select="true"
            placeholder="Pick some">
          </multiselect>
        </div>
      </div>
      
      <b-table striped hover
      :items="dataFiltered"
      :fields="fields">
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import BarChart from "./components/BarChart";
import Multiselect from 'vue-multiselect'

export default {
  components: {
    BarChart,
    Multiselect
  },
  data() {
    return {
      totalCases: [],
      countries: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      dataFiltered: [],
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
      selectedCountries: [],
    };
  },
  methods: {
    deleteCountry(event){
      this.$store.commit('deleteCountry', event)
      console.log("STORE", this.$store.state.countries)

      if (this.$store.state.countries.length > 0){
        this.dataFiltered = this.$store.state.data.filter((x) => this.$store.state.countries.includes(x.name));
      } else {
        this.dataFiltered = this.$store.state.data;
      }
      console.log('this.dataFiltered', this.dataFiltered);
    },
    increment(event) {
      this.$store.commit('addCountry', event);
      console.log("STORE", this.$store.state.countries);
      this.dataFiltered = this.$store.state.data.filter((x) => this.$store.state.countries.includes(x.name));
      console.log('this.dataFiltered', this.dataFiltered);
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
    this.dataFiltered = this.$store.state.data;
    this.responseAvailable = true;
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
