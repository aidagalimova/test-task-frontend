import axios from "axios";

export default axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
  // headers: {
  //     'X-Auth-Token': "15a82d0f93444163a89cc8a54083dbb8"
  // },
  headers: {
    'x-rapidapi-key': 'bd0f28b56amsh163cdc0f46db14ap1fc9d4jsna2e309e7c8c7',
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  },
    responseType: "json",
});
