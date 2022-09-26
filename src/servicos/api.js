import axios from 'axios';

const api = axios.create({
    baseUrl : "http://localhost:3033",
})

export default api;