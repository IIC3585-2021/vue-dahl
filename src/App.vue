<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col">
        <h1 class="text-center">COVID-19 DATA</h1>
      </div>
    </div>
    <div v-if="!fetching">
      <div class="row mt-5">
        <div class="col">
          <h2 class="text-center">Positive</h2>
          <bar-chart
            :chartData="this.getSchema"
            :chartLabels="graphCountries"
            :options="chartOptions"
            :label="selectChart"
          />
        </div>
      </div>
      <div>
        <div>
          <multiselect
            v-model="selectChart"
            mode="multiple"
            :options="selectOptions"
            @select="changeChart($event)"
          >
          </multiselect>
          <multiselect
            v-model="selectedCountries"
            @select="addCountry($event)"
            @remove="deleteCountry($event)"
            :options="this.getCountriesFromData"
            :multiple="true"
            :close-on-select="true"
            placeholder="Pick some"
          >
          </multiselect>
        </div>
      </div>

      <div v-if="graphCountries.length > 0">
        <b-table
          striped
          hover
          :items="
            this.getSchema.filter((elem) => graphCountries.includes(elem.name))
          "
          :fields="fields"
        >
        </b-table>
      </div>
      <div v-else>
        <b-table striped hover :items="this.getSchema" :fields="fields">
        </b-table>
      </div>
    </div>
    <div v-else>
      <div class="text-center">
        <b-spinner label="Spinning"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import { mapActions, mapState, mapGetters } from "vuex";
import BarChart from "./components/BarChart";
import Multiselect from "vue-multiselect";

export default {
  components: {
    BarChart,
    Multiselect,
  },
  computed: {
    ...mapState(["data", "graphCountries", "selectedChart", "fetching"]),
    ...mapGetters(["getCountriesFromData", "getSchema"]),
  },
  data() {
    return {
      totalCases: [],
      countries: this.getCountriesFromData,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      dataFiltered: [this.graphCountries],
      responseAvailable: false,
      fields: [
        {
          key: "name",
          sortable: true,
        },
        {
          key: "active_cases",
          sortable: true,
        },
        {
          key: "deaths",
          sortable: true,
        },
        {
          key: "total_cases",
          sortable: true,
        },
      ],
      selectedCountries: [],
      selectChart: this.$store.state.selectedChart,
      selectOptions: ["total_cases", "active_cases", "deaths"],
    };
  },
  methods: {
    ...mapActions([
      "fetchBarChartData",
      "addCountry",
      "deleteCountry",
      "changeChart",
    ]),
  },
  async created() {
    await this.fetchBarChartData();
    this.responseAvailable = true;
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
