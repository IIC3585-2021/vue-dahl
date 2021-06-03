import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Array,
      required:true,
    },
    chartLabels: {
      type: Array,
      required:true,
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
