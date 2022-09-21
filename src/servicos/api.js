import axios from 'axios';

const api = axios.create({
    baseUrl : "http://localhost:3055",
})

export default api;