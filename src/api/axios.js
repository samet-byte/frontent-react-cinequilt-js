import axios from 'axios';

const BASE_URL = '/api/v1';

export default axios.create({
    baseURL: '/api/v1'
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});