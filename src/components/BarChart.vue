<script>
import { Bar } from "vue-chartjs";
const _ = require("lodash");

export default {
  extends: Bar,
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    chartLabels: {
      type: Array,
    },
    options: {
      type: Object,
    },
  },
  mounted() {
    const orderedData = _.orderBy(this.chartData, [this.label], ["desc"]).slice(
      0,
      10
    );

    this.renderChart(
      {
        labels: orderedData.map((d) => d["name"]),
        datasets: [
          {
            label: this.$store.state.selectedChart,
            backgroundColor: "#f87979",
            data: orderedData.map((d) => d[this.label]),
          },
        ],
      },
      this.options
    );
  },
  watch: {
    chartLabels: function() {
      let orderedData = _.orderBy(this.chartData, [this.label], ["desc"]).slice(
        0,
        10
      );
      let filteredData = this.chartData.filter((x) =>
        this.chartLabels.includes(x["name"])
      );

      orderedData = orderedData.map((d) => ({
        ...d,
        color: "#f87979",
      }));

      filteredData = filteredData.map((d) => ({
        ...d,
        color: "#ddd979",
      }));

      orderedData.push.apply(orderedData, filteredData);
      orderedData = _.uniqBy(orderedData, "name");
      orderedData = _.orderBy(orderedData, [this.label], ["desc"]);

      this.renderChart(
        {
          labels: orderedData.map((d) => d["name"]),
          datasets: [
            {
              label: this.$store.state.selectedChart,
              backgroundColor: orderedData.map((d) => d.color),
              data: orderedData.map((d) => d[this.label]),
            },
          ],
        },
        this.options
      );
    },

    label: function() {
      const orderedData = _.orderBy(this.chartData, [this.label], ["desc"]);

      this.renderChart(
        {
          labels: orderedData.map((d) => d["name"]).slice(0, 10),
          datasets: [
            {
              label: this.$store.state.selectedChart,
              backgroundColor: "#f87979",
              data: orderedData.map((d) => d[this.label]).slice(0, 10),
            },
          ],
        },
        this.options
      );
    },
  },
};
</script>
