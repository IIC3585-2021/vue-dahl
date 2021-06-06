import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://coronavirus-map.p.rapidapi.com/v1/summary/latest',
  headers: {
    'x-rapidapi-key': '531a08cec7msh94a6d9b4e4a844ep15f8fbjsnb6421a2820ce',
    'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
  }
};

export default {
  getBarChartData(){
    return axios.request(options)
  }
}