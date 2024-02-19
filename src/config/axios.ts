import axios, { AxiosInstance } from 'axios';

const clienteAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default clienteAxios;