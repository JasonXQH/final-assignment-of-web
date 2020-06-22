import axios from 'axios';
const Api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  // timeout: ,
});

export default Api;
