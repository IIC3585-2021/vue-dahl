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
      type:Array
    },
    options: {
      type: Object
    }
  },
  mounted() {
    // const dates = this.chartData.map(d => d.date).reverse();
    // const totals = this.chartData.map(d => d.total).reverse();

    this.renderChart({
      labels: this.chartLabels.slice(0, 10),
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: this.chartData.slice(0, 10)
        }
      ]
    }, this.options)
  }
};
</script>
