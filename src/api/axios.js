
// const express = require('express');
// const cors = require('cors')
// const app = express();
//
// app.use(cors());
import axios from 'axios';

// const BASE_URL = 'http://localhost:8080/api/v1';
const BASE_URL = '/api/v1';

export default axios.create({
    baseURL: '/api/v1'
    // baseURL: 'http://localhost:8080/api/v1'
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});