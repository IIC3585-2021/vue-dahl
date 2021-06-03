<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
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
    console.log('this.chartData', this.chartData);
    // const dates = this.chartData.map(d => d.date).reverse();
    // const totals = this.chartData.map(d => d.total).reverse();

    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: this.chartData
        }
      ]
    }, this.options)
  }
};
</script>
