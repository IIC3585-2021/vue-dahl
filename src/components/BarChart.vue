<script>
import { Bar } from "vue-chartjs";

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

    const names = this.chartData.map(d => d["name"]);
    const totalCases = this.chartData.map(d => d);

    this.renderChart({
      labels: names.slice(0, 10),
      datasets: [
        {
          label: 'Total de Casos Activos',
          backgroundColor: "#f87979",
          data: totalCases.slice(0, 10)
        }
      ]
    }, this.options)
  }
};
</script>
