import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gagego-dsvendas.herokuapp.com',
});

export default api;