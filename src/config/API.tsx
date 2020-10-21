import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/gateway/',
    timeout: 20000,
    headers: {'Access-Control-Allow-Origin':'*'}
})

export default instance;

