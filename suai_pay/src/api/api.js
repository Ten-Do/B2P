import axios from "axios";

const API_URL = 'https://path/to/server/api';

const $api = axios.create({
    baseURL: API_URL
})

// in this file you can add interceptors for requests and responses

export default $api;