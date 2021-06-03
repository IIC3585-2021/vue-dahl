<template>
  <div id="app">
    <el-row type="flex" class="row-bg" justify="center">
      <el-radio v-model="radio" label="bar">Bar</el-radio>
      <el-radio v-model="radio" label="line">Line</el-radio>
      <el-radio v-model="radio" label="pie">Pie</el-radio>
      <el-radio v-model="radio" label="bubble">Bubble</el-radio>
    </el-row>
    <router-view></router-view>
    <div>Data: {{data}}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'app',
  data () {
    return {
      summary: "",
      regions: "",
      bydate:"",
      data:"",
      responseAvailable: false,
      apiKey: '531a08cec7msh94a6d9b4e4a844ep15f8fbjsnb6421a2820ce',
      radio: ''
    }
      
  },
  watch: {
    radio() {
      this.navigateChart(this.radio);
    }
  },
  methods: {
    navigateChart(url) {
      this.$router.push(url);
    }
  },
    created() {
      console.log('created');
      this.responseAvailable = false;

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
      console.log(data);
      this.data = data;
      const total_cases = Object.keys(this.regions).map( name => (
              this.regions[name].total_cases
        ))
      console.log(total_cases)
    }).catch(function (error) {
      console.error(error);
    });
      const options2 = {
      method: 'GET',
      url: 'https://coronavirus-map.p.rapidapi.com/v1/spots/summary',
      headers: {
        'x-rapidapi-key': '531a08cec7msh94a6d9b4e4a844ep15f8fbjsnb6421a2820ce',
        'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
      }
    };

    axios.request(options2).then((response) => {
      console.log("Second request", response.data);
      this.bydate = response.data.data;
    }).catch(function (error) {
      console.error(error);
    });
  },
  mounted() {
    this.radio = 'bar';
    this.navigateChart('bar');
    console.log("mounted!");
  }
}

</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
