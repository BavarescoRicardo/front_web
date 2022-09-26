import axios from 'axios';

const api = axios.create({
    baseUrl : "https://tcc-spring-back-end.herokuapp.com",
})

export default api;