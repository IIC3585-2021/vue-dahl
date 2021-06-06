<script>
import { Bar } from "vue-chartjs";
const _ = require("lodash"); 

export default {
  extends: Bar,
  props: {
    label: {
      type: String
    },
    chartData: {
      type: Array
    },
    chartLabels:{
      type: Array
    },
    options: {
      type: Object
    }
  },
  mounted() {
    // const dates = this.chartData.map(d => d.date).reverse();
    // const totals = this.chartData.map(d => d.total).reverse();

    const orderedData = _.orderBy(this.chartData, [this.label], ["desc"]);

    this.renderChart({
      labels: orderedData.map(d => d["name"]).slice(0, 10),
      datasets: [
        {
          label: 'Total de Casos Activos',
          backgroundColor: "#f87979",
          data: orderedData.map(d => d[this.label]).slice(0, 10)
        }
      ]
    }, this.options)
  },
  watch: {
    label: function() {

      const orderedData = _.orderBy(this.chartData, [this.label], ["desc"]);

      this.renderChart({
        labels: orderedData.map(d => d["name"]).slice(0, 10),
        datasets: [
          {
            label: 'Total de Casos Activos',
            backgroundColor: "#f87979",
            data: orderedData.map(d => d[this.label]).slice(0, 10)
          }
        ]
      }, this.options);
    }
  }
};
</script>
